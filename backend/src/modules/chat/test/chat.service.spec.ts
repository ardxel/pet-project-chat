import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'modules/auth';
import { HashService, UserService } from 'modules/user';
import { User } from 'schemas';
import { ChatService } from '../chat.service';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        ChatService,
        UserService,
        HashService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
