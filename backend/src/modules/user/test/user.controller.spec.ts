import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { B2Service } from 'modules/b2/b2.service';
import { ContactService } from '../contact.service';
import { HashService } from '../hash.service';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

jest.mock('../user.service');

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, ContactService, HashService, B2Service, ConfigService],
      controllers: [UserController],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });
});
