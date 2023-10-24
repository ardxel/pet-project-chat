import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from 'modules/auth/dto';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'schemas';
import { exclude } from 'utils';

type UserSafeCopy = Omit<User, 'password' | 'contacts'> & { _id: Types.ObjectId };

type EmailOrId = { email?: string; _id?: Types.ObjectId | string };

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) {}

  async create(dto: RegisterUserDto): Promise<UserSafeCopy> {
    const user = new this.model(dto);
    const savedUser = await this.saveUserAsync(user);
    return this.getSafeCopy(savedUser);
  }

  async findById(_id: Types.ObjectId): Promise<UserDocument | null> {
    return await this.model.findById(_id);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.model.findOne({ email });
  }

  async update(_id: Types.ObjectId, entity: Partial<User>) {
    return await this.model.findByIdAndUpdate(_id, { $set: entity });
  }

  async delete(_id: Types.ObjectId): Promise<boolean> {
    await this.model.findByIdAndDelete(_id);
    return true;
  }

  async getUserContactsById(_id: Types.ObjectId): Promise<{ contacts: User[] }> {
    if (await this.isNotExist({ _id })) throw new NotFoundException('There is no user with this ID');

    const { contacts } = await this.model
      .findById(_id)
      .select('contacts')
      .populate<{ contacts: User[] }>({ path: 'contacts.user', select: '-password -contacts' })
      .select('contacts');

    return { contacts };
  }

  async isExist({ email, _id }: EmailOrId) {
    const count = await this.model.countDocuments(email ? { email } : { _id });
    return count > 0;
  }

  async isNotExist({ email, _id }: EmailOrId) {
    const count = await this.model.countDocuments(email ? { email } : { _id });
    return count === 0;
  }

  getSafeCopy(user: UserDocument): UserSafeCopy {
    return exclude(user.toObject(), 'password', 'contacts');
  }

  private async saveUserAsync(user: UserDocument): Promise<UserDocument> {
    try {
      const saved = await user.save();
      return saved;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User with the same email already exists');
      } else if (error.name === 'ValidationError') {
        throw new UnprocessableEntityException(error.message);
      } else {
        throw new InternalServerErrorException('Failed to create user');
      }
    }
  }
}
