import { IUser } from 'entities/session';

export const userStub = (): IUser => ({
  _id: '1',
  email: 'user@example.com',
  name: 'John Doe',
  avatar: 'avatar.jpg',
  contacts: [
    {
      user: '2', // replace with actual user ID or IUser object for populated scenario
      status: 'common',
      createdAt: '2023-11-30T12:00:00Z',
    },
    // Add more contacts as needed
  ],
  conversations: [
    {
      data: '3', // replace with actual user ID or IUser object for populated scenario
      status: 'common',
    },
    // Add more conversations as needed
  ],
  firstName: 'John',
  lastName: 'Doe',
  birthday: new Date(),
  gender: 'male',
  language: ['English'],
  country: 'USA',
  phoneNumber: '123-456-7890',
  about: 'I am a sample user.',
});
