import { Tab } from '@headlessui/react';
import { FC, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface TabsProps {
  items: string[] | readonly string[];
  onSelect?: (index: number) => unknown;
  className?: string;
}

export const HorizontalTabs: FC<TabsProps> = (props) => {
  const { onSelect, items, className } = props;

  const [selected, setSelected] = useState(0);
  /* Размеры для отображения нижней линии под табами. */
  const [underlinePosition, setUnderlinePosition] = useState({ left: 0, width: 0 });
  /* Массив ссылок на табы */
  const tabsRef = useRef<HTMLElement[]>([]);

  /**
   * Изменяет выбранный (selected) стейт и изменяет размеры для отображения нижней линии.
   * @param {number} tabIndex - индекс элемента
   */
  const setTabPosition = (tabIndex: number) => {
    setSelected(tabIndex);
    if (onSelect) {
      onSelect(tabIndex);
    }
    const currentTab = tabsRef.current[tabIndex];
    if (currentTab) {
      setUnderlinePosition({
        left: currentTab?.offsetLeft,
        width: currentTab?.clientWidth,
      });
    }
  };

  useEffect(() => {
    setTabPosition(0);
  }, []);

  return (
    <Tab.Group>
      <Tab.Group selectedIndex={selected} onChange={setTabPosition}>
        <Tab.List className='relative flex gap-x-4'>
          {items &&
            items.map((item, index) => {
              return (
                <Tab
                  key={item}
                  as='button'
                  ref={(element) => (tabsRef.current[index] = element)}
                  className={twMerge(
                    '!hover:text-active-link text-sm',
                    selected === index ? '!text-active-link' : 'text-link-color',
                    className,
                  )}>
                  {item}
                </Tab>
              );
            })}
          <div
            className='absolute -bottom-2 block h-0.5 bg-icon-active-color transition-all duration-300'
            style={{ left: underlinePosition.left, width: underlinePosition.width }}
          />
        </Tab.List>
      </Tab.Group>
    </Tab.Group>
  );
};
