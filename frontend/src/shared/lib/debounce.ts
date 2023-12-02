type F = (...args: unknown[]) => unknown;

export function debounce<T extends (...args: any[]) => any>(fn: T, t: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>): void {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), t);
  };
}
