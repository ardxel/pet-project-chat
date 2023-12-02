/**
 * Функция делает копию, удаляет свойства объекта из копии и возвращает этот объект.
 * Объект копируется лишь на первом уровне вложенности.
 * @param obj - таргет объект из которого будет удалены свойства
 * @param keys - массив ключей объекта
 * @returns {obj} - новый объект без удаленных свойств.
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
