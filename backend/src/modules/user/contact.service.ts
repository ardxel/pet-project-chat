import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { User } from 'schemas';
import { AddContactDto, DeleteContactDto } from './dto';
import { UserService } from './user.service';

@Injectable()
export class ContactService {
  constructor(private readonly userService: UserService) {}

  async getUserContactsById(_id: Types.ObjectId): Promise<{ contacts: User[] }> {
    if (await this.userService.isNotExist({ _id })) throw new NotFoundException('There is no user with this ID');

    const user = await this.userService.findById(_id);

    const { contacts } = await user.populate<{ contacts: User[] }>({
      path: 'contacts.user',
      select: '-password -contacts',
    });

    return { contacts };
  }

  async addContact(dto: AddContactDto) {
    const [user, userToAdd] = await Promise.all([
      this.userService.findById(dto.initiatorId),
      this.userService.findById(dto.addedId),
    ]);

    const existedContact = user.contacts.some((contact) => contact.user.equals(dto.addedId));

    if (existedContact) {
      throw new BadRequestException('This contact is already exists');
    }

    const contact = {
      status: 'common' as 'common',
      user: dto.addedId,
      createdAt: new Date(),
    };

    user.contacts.push(contact);
    const updatedUser = await user.save();
    const new_contact = { ...contact, user: userToAdd };

    if (dto.returnUserAfter) {
      return { user: updatedUser, new_contact };
    } else {
      return { new_contact };
    }
  }

  async deleteContact(dto: DeleteContactDto) {
    await this.userService._externalModel().findByIdAndUpdate(dto.initiatorId, {
      $pull: {
        contacts: { user: dto.deletedId },
      },
    });
    if (dto.returnUserAfter) {
      const user = await this.userService.findById(dto.initiatorId);
      return { user, deletedId: dto.deletedId };
    }
    return { deletedId: dto.deletedId };
  }
}
