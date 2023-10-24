import { User } from 'schemas';
import { userStub } from '../stubs/user.stub';

export class UserModel {
  private readonly userEntiry: () => User = userStub;

  async create() {
    return this.userEntiry();
  }

  async readById() {
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
}
