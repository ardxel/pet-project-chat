type Fn = (...args: any[]) => any;
/**
 * Делает переданную функцию единожды вызываемой, то есть при повторном вызове функции
 * возвращается значение, которое было сохранено на основе первого вызова.
 */
export const once = <T extends Fn>(fn: T) => {
  let isCalled = false;
  let result: ReturnType<T>;
  return (...args: Parameters<T>) => {
    if (isCalled) return result;
    isCalled = true;
    result = fn(...args);
    return result;
  };
};
