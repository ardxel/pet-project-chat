import { ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { HttpExceptionFilter } from './http-exception.exception';

describe('HttpExceptionFilter', () => {
  let exceptionFilter: HttpExceptionFilter;
  let mockResponse: Partial<Response>;
  let mockHost: ArgumentsHost;

  beforeEach(() => {
    exceptionFilter = new HttpExceptionFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockHost = {
      // @ts-ignore
      switchToHttp: jest.fn(() => ({
        getResponse: jest.fn(() => mockResponse),
        response: mockResponse,
      })),
    };
  });

  it('should be defined', () => {
    expect(exceptionFilter).toBeDefined();
  });

  it('should handle HttpException correctly', () => {
    const httpException = new BadRequestException();

    exceptionFilter.catch(httpException, mockHost);

    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Bad Request',
      stack: undefined,
    });
  });
  it('should handle generic exceptions as internal server error', () => {
    const genericException = new Error('test error');
    exceptionFilter.catch(genericException, mockHost);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'test error',
      stack: undefined,
    });
  });
});
