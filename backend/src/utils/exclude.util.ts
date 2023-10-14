/**
 * Функция удаляет поля в объекте.
 * Объект копируется лишь на первом уровне (небезопасно если есть глубоковложенные объекты)
 * @param obj - таргет объект из которого будет удалены свойства
 * @param keys - массив ключей объекта
 * @returns - тот же самый объект без свойств
 */
export const exclude = <T, P extends [...(keyof T)[]]>(
  obj: T,
  ...keys: P
): {
  [K2 in Exclude<keyof T, P[number]>]: T[K2];
} => {
  const copy = { ...obj };
  keys.forEach((k) => delete copy[k]);
  return copy;
};
