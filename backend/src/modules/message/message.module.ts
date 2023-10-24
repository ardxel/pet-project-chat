import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationModule } from 'modules/conversation/conversation.module';
import { Message, MessageSchema } from 'schemas';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [ConversationModule, MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
