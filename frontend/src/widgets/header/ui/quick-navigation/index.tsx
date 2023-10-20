import { Menu } from '@headlessui/react';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link } from 'react-router-dom';
import { quickNavigation } from 'shared/custom';
import { DropdownListItem, IconWrapper } from 'shared/ui';

const QuickNavigation = () => {
  return (
    <Menu as='div' className='dropdown'>
      {({ open }) => (
        <>
          <Menu.Button>
            <IconWrapper focus={open} className='header-icon'>
              <ViewListIcon />
            </IconWrapper>
          </Menu.Button>
          <Menu.Items as='ul' className='dropdown-menu w-44 border border-black bg-bg'>
            {quickNavigation.map((item) => {
              const { title, items: links } = item;
              return (
                <Menu.Item as='ul' key={title} className='w-full'>
                  <li>
                    <h3 className='font-bold py-3 px-5'>{title}</h3>
                    <ul className='pb-2'>
                      {links.map((link) => (
                        <li key={link.href} className='px-5 py-2'>
                          <Link to={link.href}>
                            <DropdownListItem Icon={<link.Icon />} text={link.text} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
};

export default QuickNavigation;
