import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { BaseResponse } from 'common/interfaces/base-response.interface';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, BaseResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<BaseResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        payload: data,
      })),
    );
  }
}
