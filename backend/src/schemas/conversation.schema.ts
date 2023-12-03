import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';
import { Message } from './message.schema';
import { User } from './user.schema';

@Schema({ versionKey: false, strict: true })
export class Conversation {
  @ApiPropertyOptional({ type: [User] })
  @Prop({ type: [{ required: true, type: Types.ObjectId, ref: 'User' }] })
  users?: Types.ObjectId[];

  @ApiPropertyOptional({ type: [Message] })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }], default: [] })
  messages?: Types.ObjectId[];

  @ApiPropertyOptional({ type: Boolean })
  @Prop({ type: Boolean, default: true })
  isPrivate: boolean;

  @ApiProperty({ readOnly: true, type: String })
  _id: Types.ObjectId;
}

export type ConversationDocument = HydratedDocument<Conversation>;
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
