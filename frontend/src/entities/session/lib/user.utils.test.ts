import { userStub } from 'test';
import { userUtils } from './user.utils';

describe('test userUtils', () => {
  test('test getName', () => {
    const user = userStub();
    const userWithFullname = userStub();
    const userWithoutFullName = userStub();

    delete userWithoutFullName.firstName;
    delete userWithoutFullName.lastName;

    expect(userUtils.getName(userWithFullname)).toBe(user.firstName + ' ' + user.lastName);
    expect(userUtils.getName(userWithoutFullName)).toBe(user.name);
  });

  test('test getUserContactsLength', () => {
    const user = userStub();

    expect(userUtils.getUserContactsLength(user)).toBe(user.contacts.length);
  });

  test('test getUserId', () => {
    const userAsObject = userStub();
    const userAsId = userAsObject._id;

    expect(userUtils.getUserId(userAsObject)).toBe(userAsObject._id);
    expect(userUtils.getUserId(userAsId)).toBe(userAsId);
  });

  test('test hasFullname', () => {
    const user = userStub();
    const userWithoutFullName = userStub();

    delete userWithoutFullName.firstName;
    delete userWithoutFullName.lastName;

    expect(userUtils.hasFullname(user)).toBeTruthy();
    expect(userUtils.hasFullname(userWithoutFullName)).toBeFalsy();
  });

  test('test getMutualContacts', () => {
    const user1 = userStub();
    const user2 = userStub();

    expect(userUtils.getMutualContactIds(user1, user2)).toEqual([user1.contacts[0].user]);
  });
});
