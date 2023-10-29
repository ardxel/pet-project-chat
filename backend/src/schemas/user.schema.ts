import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, strict: true })
export class User {
  @Prop({ required: true, unique: true, type: String })
  @ApiProperty()
  email: string;

  @Prop({ required: true, type: String })
  @ApiProperty()
  name: string;

  @Prop({ required: false, type: String })
  @ApiProperty()
  firstName?: string;

  @Prop({ required: false, type: String })
  @ApiProperty()
  lastName?: string;

  @Prop({
    required: true,
    type: String,
    select: false,
    match: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!-_.]){8,}$/i, 'Password is invalid'],
  })
  @ApiProperty()
  password: string;

  @Prop({
    required: false,
    _id: false,
    type: [{ type: Types.ObjectId, ref: 'Conversation' }],
    default: [],
  })
  @ApiProperty()
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
  @ApiProperty()
  contacts?: { user: Types.ObjectId; isFavorite: boolean; createdAt?: Date }[];

  @Prop({
    required: false,
    type: Date,
  })
  @ApiProperty()
  birthday?: Date;

  @Prop({
    required: false,
    type: String,
  })
  @ApiProperty()
  gender?: string;

  @Prop({
    required: false,
    type: [String],
  })
  @ApiProperty()
  language?: string[];

  @Prop({
    require: false,
    type: String,
  })
  @ApiProperty()
  hometown?: string;

  @Prop({
    required: false,
    type: String,
  })
  @ApiProperty()
  phoneNumber?: string;

  @Prop({
    required: false,
    type: String,
  })
  @ApiProperty()
  about?: string;

  @ApiProperty()
  _id: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
