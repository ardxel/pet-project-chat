import { Menu, Tab } from '@headlessui/react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRef, useState } from 'react';
import { IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';

const Notifications = () => {
  const [selected, setSelected] = useState(0);
  /* Размеры для отображения нижней линии под табами. */
  const [underlinePosition, setUnderlinePosition] = useState({ left: 0, width: 47 });
  /* Массив ссылок на табы */
  const tabsRef = useRef<HTMLElement[]>([]);

  /**
   * Изменяет выбранный (selected) стейт и изменяет размеры для отображения нижней линии.
   * @param {number} tabIndex - индекс элемента
   */
  const setTabPosition = (tabIndex: number) => {
    setSelected(tabIndex);
    const currentTab = tabsRef.current[tabIndex];
    if (currentTab) {
      setUnderlinePosition({
        left: currentTab?.offsetLeft,
        width: currentTab?.clientWidth,
      });
    }
  };

  return (
    <Menu className='dropdown' as='div'>
      <Menu.Button>
        <IconWrapper className='header-icon'>
          <NotificationsIcon />
        </IconWrapper>
      </Menu.Button>
      <Menu.Items as='div' className='dropdown-menu w-[19rem] bg-bg h-[20rem]'>
        <div className='w-full h-12 flex justify-between items-center px-5 py-4 border-border border'>
          <h2 className=' text-left'>Оповещения</h2>
          <Tab.Group selectedIndex={selected} onChange={setTabPosition}>
            <Tab.List className='flex gap-x-4 relative'>
              <Tab
                as='button'
                ref={(el) => (tabsRef.current[0] = el)}
                className={twMerge(
                  'text-sm hover:text-active-link tab-btn-0',
                  selected === 0 ? 'text-active-link' : 'text-link-color',
                )}>
                Новые
              </Tab>
              <Tab
                as='button'
                ref={(el) => (tabsRef.current[1] = el)}
                className={twMerge(
                  'text-sm hover:text-active-link tab-btn-1',
                  selected === 1 ? 'text-active-link' : 'text-link-color',
                )}>
                Все
              </Tab>
              <div
                className='absolute -bottom-2 block h-0.5 bg-icon-active-color transition-all duration-300'
                style={{ left: underlinePosition.left, width: underlinePosition.width }}
              />
            </Tab.List>
          </Tab.Group>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default Notifications;
