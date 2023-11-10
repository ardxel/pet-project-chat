import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

const ObjectId = Types.ObjectId;

@Schema({ versionKey: false, strict: true, timestamps: true })
export class Message {
  @ApiProperty({ type: ObjectId })
  @Prop({ required: true, type: Types.ObjectId, ref: 'Conversation' })
  conversationId: Types.ObjectId;

  @ApiProperty({ type: ObjectId })
  @Prop({ required: true, type: Types.ObjectId, ref: 'User', _id: false })
  sender: Types.ObjectId;

  @ApiProperty({ type: String })
  @Prop({ required: true, type: String })
  text: string;

  @ApiProperty({ type: ObjectId })
  _id: Types.ObjectId;
}

export type MessageDocument = HydratedDocument<Message>;
export const MessageSchema = SchemaFactory.createForClass(Message);
