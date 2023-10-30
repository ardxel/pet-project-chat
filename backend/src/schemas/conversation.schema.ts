import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ versionKey: false, strict: true })
export class Conversation {
  @Prop({ type: [{ required: true, type: Types.ObjectId, ref: 'User' }] })
  users?: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }], default: [] })
  messages?: Types.ObjectId[];

  @Prop({ type: Boolean, default: true })
  isPrivate: boolean;

  _id: Types.ObjectId;
}

export type ConversationDocument = HydratedDocument<Conversation>;
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
