import { Contact, IUser } from '../api';
class UserUtils {
  /**
   *
   * @param {IUser[]} users массив пользователей, в основном это пара юзеров
   * @returns {string[]} возвращаем массив id общих контактов.
   *
   * @description используется в основном для запросов на бэк или подсчета числа общих контактов.
   */
  public getMutualContactIds(...users: IUser[]): string[] {
    const contactsCounterMap: Record<string, number> = {};
    const contactIds: Set<string> = new Set();

    users.forEach((user) => {
      if (user.contacts && user.contacts.length > 0) {
        for (const contact of user.contacts) {
          const contactId = this.isPopulatedContact(contact) ? contact.user._id : contact.user;
          if (contactId in contactsCounterMap) {
            const count = (contactsCounterMap[contactId] += 1);
            if (count === users.length) {
              contactIds.add(contactId);
            }
          } else {
            contactsCounterMap[contactId] = 1;
          }
        }
      }
    });

    return Array.from(contactIds);
  }

  /**
   *
   * @param {IUser} user
   * @returns вернуть полное имя если оно есть, иначе вернуть основное (name)
   */
  public getName(user: IUser | Partial<IUser> | string): string {
    if (typeof user === 'string') return;

    if (this.hasFullname(user)) {
      return `${this.capitalize(user?.firstName)} ${this.capitalize(user?.lastName)}`;
    }

    return user?.name;
  }

  /**
   *
   * @param {IUser} user
   * @return длину контактов либо 0
   * @description не всегда контакты существуют у пользователя, поэтому лучше использовать данный геттер
   */
  public getUserContactsLength(user: IUser) {
    return user.contacts?.length || 0;
  }

  /**
   *
   * @param {IUser | string} объект пользователя либо его id
   * @returns id пользователя из объекта пользователя либо саму строку
   */
  public getUserId(user: IUser | string): string {
    return this.isPopulatedUser(user) ? user._id : user;
  }

  /**
   *
   * @param {IUser} user
   * @returns {boolean} есть ли у пользователя fullname и lastname свойства
   */
  public hasFullname(user: IUser | Partial<IUser>): boolean {
    return Boolean(user?.firstName && user?.lastName);
  }

  /**
   *
   * @param {string} str строка любой длины
   * @returns возвращает строку с первым символом в верхнем регистре
   */
  private capitalize(str: string): string {
    if (str.length === 0) return;
    if (str.length === 1) return str.toUpperCase();

    const firstLetterCap = str.charAt(0).toUpperCase();
    return firstLetterCap + str.slice(1);
  }

  /**
   * Проверяет тип контакта и уменьшает его до Contact<true> или Contact<false>.
   * @param {Contact<false> | Contact<true>} contact - Контакт в массиве контактов пользователя.
   * @returns {contact is Contact<true>} Возвращает true, если контакт представляет собой объект пользователя (Contact<true>),
   *                                     и false, если контакт представляет собой строку идентификатора пользователя (Contact<false>).
   *
   * @description
   *    Если контакт представляет собой объект user, то он будет типизирован как Contact<true>.
   *    В противном случае, если контакт является строкой, то это будет рассматриваться как идентификатор пользователя в виде строки.
   *    @see {IUser}
   *
   * @example
   *  const contact = user.contacts[0];
   *  if (isPopulatedContact(contact)) {
   *    return contact.user.phoneNumber;
   *    } else {
   *    await fetchUserByContactId(contact.user);
   *    ...
   *  }
   */
  private isPopulatedContact(contact: Contact<false> | Contact<true>): contact is Contact<true> {
    return typeof contact.user !== 'string' && '_id' in contact.user;
  }

  /**
   * Проверяет тип пользователя и уменьшает его до IUser или string.
   * @param {IUser | string} user - Пользователь или строка идентификатора пользователя.
   * @returns {user is IUser} Возвращает true, если пользователь представляет собой объект пользователя (IUser), и false,
   *                          если пользователь представляет собой строку идентификатора пользователя.
   *
   * @description
   *    Если пользователь представляет собой объект, то он будет типизирован как IUser.
   *    В противном случае, если пользователь является строкой, то это будет рассматриваться как идентификатор пользователя в виде строки.
   *    @see {IUser}
   */
  private isPopulatedUser(user: IUser | string): user is IUser {
    return typeof user === 'object' && '_id' in user;
  }
}

export const userUtils = new UserUtils();
