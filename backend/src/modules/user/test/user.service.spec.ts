import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'schemas';
import { UserService } from '../user.service';
import { userStub } from './stubs/user.stub';
import { UserModel } from './support/user.model';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useClass: UserModel,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create user', () => {
    let registerUserDto = {
      email: userStub().email,
      name: userStub().name,
      password: userStub().password,
    };
    let user;
    beforeEach(async () => {
      user = await userService.create(registerUserDto);
    });
  });
});
