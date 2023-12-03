import { Ref, useEffect, useRef, useState } from 'react';

/**
 * Пользовательский хук для определения подходящей позиции выпадающего меню относительно заданного DOM-элемента.
 * @param {object} options - Объект дополнительных опций.
 * @param {number} options.menuHeight - Высота выпадающего меню.
 * @param {Array<any>} deps - Массив зависимостей, при изменении которых будет происходить перерасчет позиции.
 *
 * @returns {['top' | 'bottom', Ref<T>]} Возвращает некий геттер и сеттер. Геттер это позиция для выпадающего меню.
 *  сеттер это ref объект, который нужно прокинуть в пропсы нужному элементу, от которого идет зависимость расположения самого меню
 *
 * Если не хватает места сверху для отображения выпадающего меню, то позиция будет 'bottom', и наоборот.
 * Возвращает только строку, с помощью которой можно будет динамически настроить стили и не более.
 */
export const useAdaptiveMenuPosition = <T extends HTMLElement>(
  deps: any[],
  options?: {
    menuHeight?: number;
  },
): ['top' | 'bottom', Ref<T>] => {
  const [menuPosition, setMenuPosition] = useState<'top' | 'bottom'>('top');
  const ref = useRef<T>();
  /**
   * В среднем высота выпадающего меню около 400 пикселей, но это не точно.
   */
  const HEIGHT = options?.menuHeight || 400;
  /**
   * Если меню кнопок выходит за пределы чата сверху,
   * то тогда отображать снизу, а если нет, то сверху.
   */

  useEffect(() => {
    if (ref.current) {
      const btnRect = ref.current.getBoundingClientRect();
      setMenuPosition(btnRect.top <= HEIGHT ? 'bottom' : 'top');
    }
  }, deps);

  return [menuPosition, ref];
};
