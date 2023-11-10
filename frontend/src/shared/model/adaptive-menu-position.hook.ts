import { MutableRefObject, useEffect, useState } from 'react';

/**
 * Пользовательский хук для определения подходящей позиции выпадающего меню относительно заданного DOM-элемента.
 *
 * @param {MutableRefObject<HTMLElement>} ref - Реф объект, созданный через useRef, представляющий DOM-элемент, относительно которого нужно расположить выпадающее меню.
 * @param {object} options - Объект дополнительных опций.
 * @param {number} options.menuHeight - Высота выпадающего меню.
 * @param {Array<any>} deps - Массив зависимостей, при изменении которых будет происходить перерасчет позиции.
 *
 * @returns {'top' | 'bottom'} Возвращает более подходящую позицию для выпадающего меню.
 *
 * Если не хватает места сверху для отображения выпадающего меню, то позиция будет 'bottom', и наоборот.
 * Возвращает только строку, с помощью которой можно будет динамически настроить стили и не более.
 */
export const useAdaptiveMenuPosition = (
  ref: MutableRefObject<HTMLElement>,
  deps: any[],
  options?: {
    menuHeight?: number;
  },
) => {
  const [menuPosition, setMenuPosition] = useState<'top' | 'bottom'>('top');
  /**
   * В среднем высота выпадющего меню около 400 пикселей, но это не точно.
   */
  const HEIGHT = options.menuHeight || 400;
  /**
   * Если меню кнопок выходит за пределы чата сверху,
   * то тогда отображать снизу, а если нет, то сверху.
   */

  useEffect(
    () => {
      if (ref.current) {
        const btnRect = ref.current.getBoundingClientRect();
        setMenuPosition(btnRect.top <= HEIGHT ? 'bottom' : 'top');
      }
    },
    deps ? deps : [ref],
  );

  return menuPosition;
};
