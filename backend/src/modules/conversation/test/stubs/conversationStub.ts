import { messageStub } from 'modules/message/test/stubs/message.stub';
import { userStub } from 'modules/user/test/stubs/user.stub';
import { Types } from 'mongoose';

export const conversationStub = () => ({
  users: [new Types.ObjectId(userStub()._id)],
  messages: [new Types.ObjectId(messageStub()._id)],
  isPrivate: true,
  _id: new Types.ObjectId('65429383bd914bb89c310169'),
});
