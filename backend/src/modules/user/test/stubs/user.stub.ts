import { Types } from 'mongoose';
import { User } from 'schemas';

export const userStub = (): User => ({
  _id: new Types.ObjectId(),
  email: 'test@example.com',
  name: 'john123',
  password: 'Qwerty1234!',
});
