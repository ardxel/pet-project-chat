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

  async findById(_id: Types.ObjectId) {
    const user = await this.model.findById(_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
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

  async isExist({ email, _id }: EmailOrId) {
    return Boolean(await this.model.exists(email ? { email } : { _id }));
  }

  async isNotExist({ email, _id }: EmailOrId) {
    return !Boolean(await this.model.exists(email ? { email } : { _id }));
  }

  public _externalModel() {
    return this.model;
  }
}
