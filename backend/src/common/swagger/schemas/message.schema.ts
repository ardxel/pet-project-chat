import { ApiProperty } from '@nestjs/swagger';
import { Message } from 'schemas';
import { ResponseData } from './response.schema';

class MessageData {
  @ApiProperty({ type: Message })
  message: Message;
}

export class MessageResponseData extends ResponseData {
  @ApiProperty({
    type: MessageData,
  })
  payload: {
    message: MessageData;
  };
}

export class ResponseDataDeletedMessage extends ResponseData {
  @ApiProperty({ type: Boolean })
  payload: Boolean;
}
