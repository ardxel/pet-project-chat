import { Test, TestingModule } from '@nestjs/testing';
import { userStub } from 'modules/user/test/stubs/user.stub';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { RegisterUserDto } from '../dto';

jest.mock('../auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      controllers: [AuthController],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('sign-up', () => {
    let registerUserDto: RegisterUserDto;
    let data;
    beforeEach(async () => {
      registerUserDto = {
        email: userStub().email,
        name: userStub().name,
        password: userStub().password,
      };

      data = await authController.signUp(registerUserDto);
    });

    test('should call authService', async () => {
      expect(authService.signUp).toHaveBeenCalledWith(
        expect.objectContaining({
          email: registerUserDto.email,
          password: registerUserDto.password,
          name: registerUserDto.name,
        }),
      );
    });

    test('should return a user', () => {
      expect(data).toHaveProperty('user');
      expect(data.user).toHaveProperty('email', registerUserDto.email);
      expect(data.user).toHaveProperty('name', registerUserDto.name);
      expect(data.user).toHaveProperty('password', registerUserDto.password);
    });
  });
});
