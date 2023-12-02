type IsNullable<T> = T extends undefined ? true : T extends null ? true : false;
/**
 *
 * @param {Record<string, unknown>} object
 * @returns {object} новый объект без ключей, свойства которых являются null или undefined
 */
export const excludeNullableValues = <T extends Record<string, unknown>>(
  object: T,
): {
  [P in keyof T as IsNullable<T[P]> extends true ? never : P]: T[P];
} => {
  const result = {} as T;
  for (const key in object) {
    if (object[key] !== undefined && object[key] !== null) {
      result[key] = object[key];
    }
  }

  return result;
};
