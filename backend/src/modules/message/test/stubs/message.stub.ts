import { userStub } from 'modules/user/test/stubs/user.stub';
import { Types } from 'mongoose';
import { Message } from 'schemas';

export const messageStub: () => Message = () => ({
  conversationId: new Types.ObjectId('6542924a89b764b072c0ab31'),
  _id: new Types.ObjectId('654292628e5fe4401fc3e3f2'),
  text: 'Hello world',
  sender: new Types.ObjectId(userStub()._id),
  type: 'text',
});
