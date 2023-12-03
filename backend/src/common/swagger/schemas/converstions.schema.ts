import { ApiProperty } from '@nestjs/swagger';
import { Conversation, Message } from 'schemas';
import { ResponseData } from './response.schema';

export class ResponseDataNewConversation extends ResponseData {
  @ApiProperty({ type: Conversation })
  payload: Conversation;
}

export class ResponseDataConversationMessages extends ResponseData {
  @ApiProperty({ type: [Message] })
  payload: Message[];
}
