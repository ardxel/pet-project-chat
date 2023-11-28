import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from 'modules/auth/dto';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'schemas';
import { ChangePasswordDto, FindManyQueryDto, UpdateUserDto } from './dto';
import { HashService } from './hash.service';

type EmailOrId = { email?: string; _id?: Types.ObjectId };

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
    private readonly hashService: HashService,
  ) {}

  async create(dto: RegisterUserDto): Promise<UserDocument> {
    const user = await this.model.create(dto);
    return user;
  }

  async findById(_id: Types.ObjectId, options?: { selectPassword?: boolean }) {
    const user = await this.model.findById(_id, options?.selectPassword ? '+password' : undefined);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string, options?: { selectPassword?: boolean }): Promise<UserDocument | null> {
    return await this.model.findOne({ email }).select(options?.selectPassword ? '+password' : undefined);
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

  async update(dto: UpdateUserDto): Promise<UserDocument> {
    console.log(dto);

    if ('email' in dto) {
      const isExist = await this.isExist({ email: dto.email });
      if (isExist) {
        throw new BadRequestException('Почтовый адрес занят');
      }
    }

    /**
     * Id лучше не использовать в update query, а пароль меняется в другом месте.
     */
    const { _id, password, ...rest } = dto;
    return await this.model.findByIdAndUpdate(dto._id, { $set: rest }, { new: true });
  }

  async changePassword(dto: ChangePasswordDto) {
    const userById = await this.findById(dto._id, { selectPassword: true });

    if (!(await this.hashService.comparePasswords(dto.oldPassword, userById.password))) {
      throw new UnauthorizedException('Invalid password');
    }

    if (await this.hashService.comparePasswords(dto.newPassword, userById.password)) {
      throw new UnauthorizedException('The new password must not be the same as the old one');
    }

    const hashedNewPassword = await this.hashService.encryptPassword(dto.newPassword);

    userById.set('password', hashedNewPassword);
    await userById.save();

    const { password, ...safeUserData } = userById;
    return safeUserData;
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
