import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type UserStatus = 'online' | 'offline' | 'typing';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, strict: true })
export class User {
  @Prop({ required: true, unique: true, type: String })
  @ApiProperty()
  email: string;

  @Prop({ required: true, unique: true, type: String })
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
    // select: false,
    type: [
      {
        data: { type: Types.ObjectId, ref: 'Conversation' },
        status: { type: String, enum: ['common', 'archived', 'spam', 'trash'], default: 'common' },
      },
    ],
    default: [],
  })
  @ApiProperty()
  conversations?: { data: Types.ObjectId; status: 'common' | 'archived' | 'spam' | 'trash' }[];

  @Prop({
    required: false,
    _id: false,
    type: [
      {
        user: { type: Types.ObjectId, ref: User.name },
        status: {
          type: String,
          enum: ['common', 'favorite', 'blocked'],
          default: 'common',
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  @ApiProperty()
  contacts?: { user: Types.ObjectId; status: 'common' | 'favorite' | 'blocked'; createdAt?: Date }[];

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
  country?: string;

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
