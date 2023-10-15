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

type UserSafeCopy = Omit<User, 'password'> & { _id: Types.ObjectId };

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) {}

  public async create(registerUserDto: RegisterUserDto, safe?: boolean): Promise<UserDocument | UserSafeCopy> {
    const user = new this.model({ ...registerUserDto });
    const userDocument = await this.save(user);
    return safe ? this.getSafeCopy(userDocument) : userDocument;
  }
  public async readById(_id: Types.ObjectId | string): Promise<UserDocument | null> {
    return await this.model.findById(_id);
  }
  public async readByEmail(email: string): Promise<UserDocument | null> {
    return await this.model.findOne({ email });
  }
  public async readManyByIds(_ids: Types.ObjectId[] | string[]): Promise<UserDocument[]> {
    return await this.model.find({ _id: { $in: _ids } });
  }
  public async update(_id: Types.ObjectId | string, fields: Partial<User>) {
    return await this.model.findByIdAndUpdate(_id, { $set: fields });
  }
  public async delete(_id: Types.ObjectId | string): Promise<boolean> {
    if (!(await this.model.findByIdAndDelete(_id))) {
      throw new NotFoundException('User with this ID not found');
    } else {
      return true;
    }
  }
  public async __deleteAllUsers(): Promise<boolean> {
    await this.model.deleteMany({});
    return true;
  }

  public async __getUserCount() {
    return await this.model.countDocuments();
  }

  public async isUserExist(email: string): Promise<boolean> {
    return Boolean(await this.model.findOne({ email }));
  }

  public getSafeCopy(user: UserDocument): UserSafeCopy {
    return exclude(user.toObject(), 'password');
  }

  private async save(user: UserDocument): Promise<UserDocument> {
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
