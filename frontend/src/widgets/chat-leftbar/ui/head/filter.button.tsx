import { Menu } from '@headlessui/react';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { FC, useState } from 'react';
import { filterChatItems } from 'shared/custom';
import { DropdownListItem } from 'shared/ui';
import { twMerge } from 'tailwind-merge';

interface FilterButtonProps {
  onSelect?: (value: string) => unknown;
}

export const FilterButton: FC<FilterButtonProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState(filterChatItems[0].text);

  const select = (value: string) => {
    setSelected(value);
    if (onSelect) {
      onSelect(value);
    }
  };
  return (
    <Menu as='div' className='dropdown'>
      <Menu.Button
        className={twMerge(
          '[&>*]:text-form-color [&>*]:!transition-colors [&>*]:!duration-300 [&>*]:hover:text-active-link',
          'text-xs flex items-center gap-x-1 relative',
        )}>
        <FilterListOutlinedIcon className='!w-4 !h-4' />
        <p className='text-xs'>Фильтр</p>
      </Menu.Button>
      <Menu.Items as={'div'} className='dropdown-menu gap-y-3 px-6 py-4 w-44'>
        {filterChatItems.map((item) => (
          <DropdownListItem
            Icon={<item.Icon />}
            text={item.text}
            as='button'
            key={item.text}
            onClick={() => select(item.text)}
            className={twMerge(
              'flex items-center gap-x-2 [&>svg]:text-lg [&>*]:hover:text-active-link',
              selected === item.text ? '[&>*]:text-active-link' : '',
            )}></DropdownListItem>
        ))}
      </Menu.Items>
    </Menu>
  );
};
