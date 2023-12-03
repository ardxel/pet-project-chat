import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from 'schemas';

export class UpdateUserDto extends PartialType(OmitType(User, ['password'])) {}
