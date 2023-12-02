import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from 'modules/auth/dto';
import { B2Service } from 'modules/b2/b2.service';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'schemas';
import {
  ChangeAvatarDto,
  ChangeConversationStatusDto,
  ChangePasswordDto,
  FindManyQueryDto,
  UpdateUserDto,
} from './dto';
import { HashService } from './hash.service';

type UniqueMap = { email?: string; _id?: Types.ObjectId; name?: string };

@Injectable()
export class UserService {
  private readonly _logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
    private readonly hashService: HashService,
    private readonly b2Service: B2Service,
  ) {}

  async create(dto: RegisterUserDto): Promise<UserDocument> {
    try {
      const user = await this.model.create(dto);
      return user;
    } catch (error) {
      this._logger.error(error);
      throw new BadRequestException(error?.message);
    }
  }

  async findById(_id: Types.ObjectId, options?: { selectPassword?: boolean }) {
    const user = await this.model.findById(_id, options?.selectPassword ? '+password' : undefined);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string, options?: { selectPassword?: boolean }): Promise<UserDocument | null> {
    return await this.model.findOne({ email }, options?.selectPassword ? '+password' : undefined);
  }

  async findAll() {
    return await this.model.find({});
  }

  async findMany(queryDto: FindManyQueryDto) {
    if (!queryDto.limit) {
      queryDto.limit = 10;
    }
    if (!queryDto.page || queryDto.page < 1) {
      queryDto.page = 1;
    }

    const skip = (queryDto.page - 1) * queryDto.limit;

    const filterQueryByName = queryDto.name ? { name: { $regex: new RegExp(queryDto.name, 'i') } } : undefined;
    const filterQueryByIds = queryDto.ids?.length ? { _id: { $in: queryDto.ids } } : undefined;

    const filterQueries = [];
    if (filterQueryByName) filterQueries.push(filterQueryByName);
    if (filterQueryByIds) filterQueries.push(filterQueryByIds);

    const users = await this.model.find({ $and: filterQueries }).skip(skip).limit(queryDto.limit);

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
    return;
  }

  async changeAvatar(dto: ChangeAvatarDto, file: Express.Multer.File) {
    const user = await this.findById(dto.userId);
    const avatarUrl = await this.b2Service.uploadFile(dto.userId, file);

    return await this.update({ _id: user._id, avatar: avatarUrl });
  }

  async changeConversationStatus(dto: ChangeConversationStatusDto) {
    const user = await this.findById(dto.userId);

    const conversationIndex = user.conversations.findIndex((item) => item.data.equals(dto.conversationId));

    if (conversationIndex === -1) {
      throw new BadRequestException('Conversation was not found');
    }

    user.conversations[conversationIndex].status = dto.status;

    await user.save();
    return user;
  }

  async delete(_id: Types.ObjectId): Promise<boolean> {
    await this.model.findByIdAndDelete(_id);
    return true;
  }

  async deleteMany() {
    return await this.model.deleteMany({});
  }

  async isExist(fields: UniqueMap) {
    return Boolean(await this.model.exists(fields));
  }

  async isNotExist(fields: UniqueMap) {
    return !Boolean(await this.model.exists(fields));
  }

  public _externalModel() {
    return this.model;
  }
}
