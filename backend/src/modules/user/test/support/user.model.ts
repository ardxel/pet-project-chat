import { User } from 'schemas';
import { userStub } from '../stubs/user.stub';

export class UserModel {
  private readonly userEntiry: () => User = userStub;

  save = jest.fn().mockResolvedValue(this.userEntiry());
  find = jest.fn().mockResolvedValue([this.userEntiry()]);
  findOne = jest.fn().mockResolvedValue(this.userEntiry());

  deleteOne = jest.fn().mockResolvedValue(true);

  async create() {
    return this.userEntiry();
  }

  async findById() {
    return this.userEntiry();
  }

  async readByEmail() {
    return this.userEntiry();
  }

  async readManyByIds() {
    return [this.userEntiry()];
  }

  async update() {
    return this.userEntiry();
  }

  async delete() {
    return this.userEntiry();
  }

  async saveUserAsync() {
    return this.userEntiry();
  }

  async isExist() {
    return false;
  }

  async isNotExist() {
    return true;
  }

  getSafeCopy() {
    const user = this.userEntiry();
    delete user.password;
    return user;
  }
}
