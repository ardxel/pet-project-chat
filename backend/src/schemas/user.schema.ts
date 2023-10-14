import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({
    required: true,
    type: String,
    match: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!-_.]){8,}$/i, 'Password is invalid'],
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
