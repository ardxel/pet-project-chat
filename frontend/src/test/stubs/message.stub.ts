export const messageStub = (): import('entities/message').IMessage => ({
  conversationId: 'conversation123',
  sender: 'JohnDoe',
  _id: 'message456',
  text: 'Hello, how are you?',
  type: 'text',
  updatedAt: '2023-12-01T12:34:56.789Z',
  createdAt: '2023-12-01T12:34:56.789Z',
});
