import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConversationService } from 'modules/conversation';
import { Model, Types } from 'mongoose';
import { Message, MessageDocument } from 'schemas';
import { CreateMessageDto } from './dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly model: Model<MessageDocument>,
    private readonly conversationService: ConversationService,
  ) {}

  async create(dto: CreateMessageDto) {
    const newMessage = new this.model(dto);
    if (await this.conversationService.isNotExist(dto.conversationId)) {
      throw new NotFoundException('Conversation was not found');
    }
    const conversation = await this.conversationService.findById(dto.conversationId);

    conversation.messages.push(newMessage._id);

    await Promise.all([newMessage.save(), conversation.save()]);

    return newMessage;
  }

  async findById(id: Types.ObjectId) {
    return await this.model.findById(id);
  }

  async deleteAll() {
    return await this.model.deleteMany({});
  }
  async findAll() {
    return await this.model.find({});
  }
}
