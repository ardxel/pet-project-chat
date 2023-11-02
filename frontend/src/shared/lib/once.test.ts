import { once } from './once';

describe('test "once" util', () => {
  const sum = (...nums: number[]) => nums.reduce((s, v) => s + v, 0);
  let fn;
  let result1;
  let result2;
  beforeEach(() => {
    fn = once(sum);
    result1 = fn(2, 2);
    result2 = fn(1, 4);
  });

  test('Test', () => {
    expect(result1).toBe(4);
    expect(result1).toBe(result2);
  });
});
