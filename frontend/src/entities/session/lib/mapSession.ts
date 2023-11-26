import { DataResponse } from 'shared/api';
import { SessionUserDto } from '../model';

export const mapSession = (dto: DataResponse<SessionUserDto>) => ({
  user: dto.payload.user,
  token: dto.payload.token,
});
