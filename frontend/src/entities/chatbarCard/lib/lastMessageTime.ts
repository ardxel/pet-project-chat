import { IMessage } from 'entities/chats/model';
import moment from 'moment';

export class MessageTimeFormatter {
  static getRelativeTime(message: IMessage | undefined): string | undefined {
    if (!message) return undefined;

    const now = moment();
    const messageTime = moment(message.updatedAt);

    const minutesDiff = now.diff(messageTime, 'minutes');
    const hoursDiff = now.diff(messageTime, 'hours');
    const daysDiff = now.diff(messageTime, 'days');
    const weeksDiff = now.diff(messageTime, 'weeks');
    const monthsDiff = now.diff(messageTime, 'months');
    const yearsDiff = now.diff(messageTime, 'years');

    // "сейчас"
    if (minutesDiff < 1) return 'сейчас';

    // Минуты
    if (minutesDiff < 60) return `${minutesDiff} ${MessageTimeFormatter.getMinutesWord(minutesDiff)}`;

    // Часы
    if (hoursDiff < 24) return `${hoursDiff} ${MessageTimeFormatter.getHoursWord(hoursDiff)}`;

    // Дни
    if (daysDiff < 7) return `${daysDiff} ${MessageTimeFormatter.getDaysWord(daysDiff)}`;

    // Недели
    if (weeksDiff < 5) return `${weeksDiff} ${MessageTimeFormatter.getWeeksWord(weeksDiff)}`;

    // Месяцы
    if (monthsDiff < 12) return `${monthsDiff} ${MessageTimeFormatter.getMonthsWord(monthsDiff)}`;

    // Года
    return `${yearsDiff} ${MessageTimeFormatter.getYearsWord(yearsDiff)}`;
  }

  private static getMinutesWord(minutes: number): string {
    return 'мин';
    /**
     * Пока что это не нужно, достаточно короткой строки "мин",
     * так как получившаяся строка и так длинная
     */
    // const lastDigit = minutes % 10;
    // if (lastDigit === 1 && minutes !== 11) {
    //   return 'минуту';
    // } else if (lastDigit >= 2 && lastDigit <= 4 && (minutes < 10 || minutes > 20)) {
    //   return 'минуты';
    // } else {
    //   return 'минут';
    // }
  }

  private static getHoursWord(hours: number): string {
    const lastDigit = hours % 10;
    if (lastDigit === 1 && hours !== 11) {
      return 'час';
    } else if (lastDigit >= 2 && lastDigit <= 4 && (hours < 10 || hours > 20)) {
      return 'часа';
    } else {
      return 'часов';
    }
  }

  private static getDaysWord(days: number): string {
    const lastDigit = days % 10;
    if (lastDigit === 1 && days !== 11) {
      return 'день';
    } else if (lastDigit >= 2 && lastDigit <= 4 && (days < 10 || days > 20)) {
      return 'дня';
    } else {
      return 'дней';
    }
  }

  private static getWeeksWord(weeks: number): string {
    return 'нед';
    /**
     * @see {MessageTimeFormatter.getMinutesWord}
     */
    // const lastDigit = weeks % 10;
    // if (lastDigit === 1 && weeks !== 11) {
    //   return 'неделю';
    // } else if (lastDigit >= 2 && lastDigit <= 4 && (weeks < 10 || weeks > 20)) {
    //   return 'недели';
    // } else {
    //   return 'недель';
    // }
  }

  private static getMonthsWord(months: number): string {
    return 'мес';
    /**
     * @see {MessageTimeFormatter.getMinutesWord}
     */
    // const lastDigit = months % 10;
    // if (lastDigit === 1 && months !== 11) {
    //   return 'месяц';
    // } else if (lastDigit >= 2 && lastDigit <= 4 && (months < 10 || months > 20)) {
    //   return 'месяца';
    // } else {
    //   return 'месяцев';
    // }
  }

  private static getYearsWord(years: number): string {
    const lastDigit = years % 10;
    if (lastDigit === 1 && years !== 11) {
      return 'год';
    } else if (lastDigit >= 2 && lastDigit <= 4 && (years < 10 || years > 20)) {
      return 'года';
    } else {
      return 'лет';
    }
  }
}
