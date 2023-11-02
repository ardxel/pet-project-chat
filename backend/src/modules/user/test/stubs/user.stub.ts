import { Types } from 'mongoose';
import { User } from 'schemas';

export const userStub = (): User => ({
  _id: new Types.ObjectId('654282bc6159a67141cd313a'),
  email: 'test@example.com',
  name: 'john123',
  password: 'Qwerty1234!',
});
