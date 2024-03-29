import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CallEndDto } from 'modules/chat/dto';
import { ConversationService } from 'modules/conversation';
import { Model, Types } from 'mongoose';
import { Message, MessageDocument } from 'schemas';
import { CreateMessageDto, DeleteMessageDto, UpdateMessageDto } from './dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly model: Model<MessageDocument>,
    private readonly conversationService: ConversationService,
  ) {}

  async create(dto: CreateMessageDto): Promise<Message> {
    const newMessage = new this.model(dto);
    if (await this.conversationService.isNotExist(dto.conversationId)) {
      throw new NotFoundException('Conversation was not found');
    }
    const conversation = await this.conversationService.findById(dto.conversationId);

    conversation.messages.push(newMessage._id);

    await Promise.all([newMessage.save(), conversation.save()]);

    return newMessage;
  }

  async createCallMessage(dto: CallEndDto) {
    const conversation = await this.conversationService.findByUserIdsOrCreate([dto.to, dto.from]);

    const text = `${dto.reason}.${dto.type}.${dto.seconds}`;
    return this.create({ conversationId: conversation._id, sender: dto.caller, type: 'call', text });
  }

  async findById(id: Types.ObjectId) {
    return await this.model.findById(id);
  }

  async update(dto: UpdateMessageDto) {
    if (await this.isNotExist(dto.messageId)) {
      throw new NotFoundException('Message was not found');
    }

    return await this.model.findByIdAndUpdate(
      dto.messageId,
      {
        $set: {
          text: dto.text,
        },
      },
      { new: true },
    );
  }

  async delete(dto: DeleteMessageDto) {
    if (!this.conversationService.isNotExist(dto.conversationId)) {
      throw new NotFoundException('Conversation was not found');
    }
    await this.conversationService.deleteMessage(dto);
    await this.model.deleteOne({ _id: dto.messageId });

    return true;
  }

  async deleteAll() {
    return await this.model.deleteMany({});
  }
  async findAll() {
    return await this.model.find({});
  }

  async isExist(messageId: Types.ObjectId) {
    const chatCount = await this.model.countDocuments(messageId);
    return chatCount > 0;
  }

  async isNotExist(messageId: Types.ObjectId) {
    const chatCount = await this.model.countDocuments(messageId);
    return chatCount === 0;
  }
}
