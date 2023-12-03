import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth';
import { ConversationModule } from 'modules/conversation/conversation.module';
import { MessageModule } from 'modules/message/message.module';
import { UserModule } from 'modules/user';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [AuthModule, UserModule, ConversationModule, MessageModule],
  controllers: [],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
