import { BaseWsExceptionFilter } from './ws-exception.filter';

describe('CommonFilter', () => {
  it('should be defined', () => {
    expect(new BaseWsExceptionFilter()).toBeDefined();
  });
});
