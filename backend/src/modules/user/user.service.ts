import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from 'modules/auth/dto';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'schemas';
import { FindManyQueryDto } from './dto';

type EmailOrId = { email?: string; _id?: Types.ObjectId };

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) {}

  async create(dto: RegisterUserDto): Promise<UserDocument> {
    const user = await this.model.create(dto);
    return user;
  }

  async findById(_id: Types.ObjectId): Promise<UserDocument | null> {
    return await this.model.findById(_id);
  }

  async findByEmail(email: string, withPassword = false): Promise<UserDocument | null> {
    return await this.model.findOne({ email }).select(withPassword ? '+password' : undefined);
  }

  async findAll() {
    return await this.model.find({});
  }

  async findMany(queryDto: FindManyQueryDto) {
    if (!queryDto.limit || queryDto.limit > 10) {
      queryDto.limit = 10;
    }
    if (!queryDto.page || queryDto.page < 1) {
      queryDto.page = 1;
    }

    const skip = (queryDto.page - 1) * queryDto.limit;
    const regexPattern = new RegExp(queryDto.name, 'i');

    const users = await this.model
      // .aggregate([{ $match: { name: regexPattern } }])
      .find({ name: { $regex: regexPattern } })
      .skip(skip)
      .limit(queryDto.limit);

    return users;
  }

  async update(_id: Types.ObjectId, entity: Partial<User>): Promise<UserDocument> {
    return await this.model.findByIdAndUpdate(_id, { $set: entity });
  }

  async delete(_id: Types.ObjectId): Promise<boolean> {
    await this.model.findByIdAndDelete(_id);
    return true;
  }

  async deleteMany() {
    return await this.model.deleteMany({});
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
}
