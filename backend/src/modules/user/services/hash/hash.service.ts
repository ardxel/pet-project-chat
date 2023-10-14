import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
@Injectable()
export class HashService {
  public async encryptPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    const hashed = await hash(password, salt);
    return hashed;
  }
  public async comparePasswords(userInput: string, encrypted: string): Promise<boolean> {
    try {
      return await compare(userInput, encrypted);
    } catch (error) {
      throw new UnauthorizedException('Incorrect password');
    }
  }
}
