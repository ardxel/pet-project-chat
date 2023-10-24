import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, strict: true })
export class User {
  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: false, type: String })
  firstName?: string;

  @Prop({ required: false, type: String })
  lastName?: string;

  @Prop({
    required: true,
    type: String,
    match: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!-_.]){8,}$/i, 'Password is invalid'],
  })
  password: string;

  @Prop({
    required: false,
    _id: false,
    type: [{ type: Types.ObjectId, ref: 'Conversation' }],
    default: [],
  })
  conversations?: Types.ObjectId[];

  @Prop({
    required: false,
    _id: false,
    type: [
      {
        user: { type: Types.ObjectId, ref: User.name },
        isFavorite: Boolean,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  contacts?: { user: Types.ObjectId; isFavorite: boolean; createdAt?: Date }[];

  @Prop({
    required: false,
    type: Date,
  })
  birthday?: Date;

  @Prop({
    required: false,
    type: String,
  })
  gender?: string;

  @Prop({
    required: false,
    type: [String],
  })
  language?: string[];

  @Prop({
    require: false,
    type: String,
  })
  hometown?: string;

  @Prop({
    required: false,
    type: String,
  })
  phoneNumber?: string;

  @Prop({
    required: false,
    type: String,
  })
  about?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
