export function formatContactWord(n: number): string {
  const lastTwoDigits = n % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'контактов';
  }

  const lastDigit = n % 10;

  if (lastDigit === 1) return 'контакт';
  if (1 < lastDigit && 5 > lastDigit) return 'контакта';

  return 'контактов';
}
