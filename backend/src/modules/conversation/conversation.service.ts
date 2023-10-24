import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'modules/user';
import { Model, Types } from 'mongoose';
import { Conversation, ConversationDocument, UserDocument } from 'schemas';
import { CreateConversationDto, GetMessagesDto } from './dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name) private readonly model: Model<ConversationDocument>,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreateConversationDto) {
    const { userIds } = dto;
    const newConversation = new this.model();
    // Массив для хранения пользователей, чьи данные нужно обновить
    const usersToUpdate: UserDocument[] = [];
    for (const userId of userIds) {
      if (await this.userService.isNotExist({ _id: userId })) throw new NotFoundException('User was not found');

      const user = await this.userService.findById(userId);
      /*
       * Добавляем id пользователя в массив пользователей беседы.
       * Мы должны убедиться, что каждый пользователь существует, поэтому лучше
       * обновить всех пользователей после.
       */
      newConversation.users.push(userId);

      // Добавляем id беседы в массив чатов пользователя
      user.conversations.push(newConversation._id);

      // Добавляем пользователя в массив для сохранения.
      usersToUpdate.push(user);
    }
    // Сохраняем пользователей и созданную беседу параллельно
    await Promise.all([newConversation.save(), usersToUpdate.map((user) => user.save())]);

    return newConversation;
  }

  async findById(conversationId: Types.ObjectId) {
    const conversation = await this.model.findById(conversationId);
    if (!conversation) {
      throw new NotFoundException('Conversation was not found');
    }
    return conversation;
  }

  async findMessages(dto: GetMessagesDto) {
    const { page, limit, conversationId } = dto;

    const conversation = await this.model.findById(conversationId);

    if (!conversation) {
      throw new BadRequestException('Conversation was not found');
    }
    const { messages } = await conversation.populate({
      path: 'messages',
      options: {
        skip: (page - 1) * limit,
        limit,
      },
    });

    return messages;
  }

  async findAllByUserId(userId: Types.ObjectId) {
    const user = await this.userService.findById(userId);
    const { conversations } = await user.populate({ path: 'conversations' });
    return conversations;
  }

  // TODO
  async update(conversationId: Types.ObjectId, entity: Partial<Conversation>) {}
  // TODO
  async delete(conversationId: Types.ObjectId) {}

  async isExist(conversationId: Types.ObjectId) {
    const chatCount = await this.model.countDocuments(conversationId);
    return chatCount > 0;
  }

  async isNotExist(conversationId: Types.ObjectId) {
    const chatCount = await this.model.countDocuments(conversationId);
    return chatCount === 0;
  }

  async findAll() {
    return await this.model.find({});
  }

  async deleteAll() {
    return await this.model.deleteMany({});
  }
}
