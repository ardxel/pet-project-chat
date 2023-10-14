import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';
import { TransformResponseInterceptor } from './transform-response.interceptor';

describe('TransformResponseInterceptor', () => {
  let interceptor: TransformResponseInterceptor<any>;
  let mockContext: ExecutionContext;
  let mockCallHandler: CallHandler;

  beforeEach(() => {
    interceptor = new TransformResponseInterceptor();
    // @ts-ignore
    mockContext = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(),
        getResponse: jest.fn(),
        getNext: jest.fn(),
      })),
    };

    mockCallHandler = {
      handle: () => of({ someData: 'value' }),
    };
  });

  it('should be defined', () => {
    expect(new TransformResponseInterceptor()).toBeDefined();
  });

  it('should transform the response', (done) => {
    const data = { someData: 'value' };
    const expectedResult = {
      status: 'success',
      payload: data,
    };

    interceptor.intercept(mockContext, mockCallHandler).subscribe((result) => {
      expect(result).toEqual(expectedResult);
      done();
    });
  });
});
