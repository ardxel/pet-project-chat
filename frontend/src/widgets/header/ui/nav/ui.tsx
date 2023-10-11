import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navLinks as items } from 'shared/custom';
import { IconWrapper } from 'shared/ui';

const Nav: FC = () => {
  const { pathname } = useLocation();
  /**
   * Определяет, является ли указанный путь активным на основе текущего URL.
   * имитация NavLink active, если в pathname есть указанный путь,
   * то тогда кнопка будет подсвечиваться как активная, см focus проп
   * @param {string} path - путь для проверки активности
   * @returns {boolean} - активен ли путь
   */
  const pathHas = (path: string) => pathname === path || pathname.startsWith(path);

  return (
    <ul className='hidden xs2:flex items-center [&>li]:inline-flex gap-x-5 ml-5 '>
      {items.map((item) => (
        <li key={item.id}>
          <NavLink to={item.href}>
            <IconWrapper className='header-icon' focus={pathHas(item.href)}>
              {item.icon}
            </IconWrapper>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
