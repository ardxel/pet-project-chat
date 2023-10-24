import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas';

@Injectable()
export class UserTestService {
  constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) {}

  async deleteAll(): Promise<boolean> {
    await this.model.deleteMany({});
    return true;
  }

  async countUsers() {
    return await this.model.countDocuments();
  }

  async findAll() {
    return await this.model.find({});
  }

  async createRandomMany(count: number) {
    const me = await this.model.findOne({ email: 'ardxel@gmail.com' });

    for (let i = 0; i < count; i++) {
      const newUser = new this.model({
        email: faker.internet.email(),
        name: faker.internet.displayName(),
        fullname: faker.internet.userName(),
        password: 'Onlyonemm1!' + i,
      });
      let randomBool = () => Math.random() < 0.5;
      const savedUser = await newUser.save();
      me.contacts.push({ user: savedUser._id, isFavorite: randomBool() });
    }

    await me.save();
  }
}
