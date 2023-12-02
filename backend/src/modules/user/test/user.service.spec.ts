import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { B2Service } from 'modules/b2/b2.service';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas';
import { HashService } from '../hash.service';
import { UserService } from '../user.service';
import { userStub } from './stubs/user.stub';
import { UserModel } from './support/user.model';

describe('UserService', () => {
  let userService: UserService;
  let model: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        HashService,
        B2Service,
        ConfigService,
        {
          provide: getModelToken(User.name),
          useClass: UserModel,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    model = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('Test findById', () => {
    let user;
    let expectedUser;

    beforeEach(async () => {
      user = await userService.findById(userStub()._id);
      expectedUser = userStub();
    });

    test('should find user', async () => {
      expect(user).toEqual(expectedUser);
    });
  });

  describe('Test create', () => {
    let user;
    let dto = userStub();

    beforeEach(async () => {
      user = await userService.create({ email: dto.email, name: dto.name, password: dto.password });
    });

    test('should be new user', () => {
      expect(user).toMatchObject(dto);
    });
  });
});
