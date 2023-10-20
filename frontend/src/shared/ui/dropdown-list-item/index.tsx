import { FC, Fragment, HTMLProps, ReactNode, createElement } from 'react';

export interface DropdownListItemProps extends HTMLProps<unknown> {
  as?: keyof JSX.IntrinsicElements;
  Icon: ReactNode | (() => ReactNode);
  text: string;
}

export const DropdownListItem: FC<DropdownListItemProps> = ({ Icon, as = 'div', text, ...rest }) => {
  return createElement(
    as,
    { className: 'flex list-item-in-dropdown', ...rest },
    <Fragment>
      {typeof Icon === 'function' ? Icon() : Icon}
      <p className='first-letter:capitalize'>{text}</p>
    </Fragment>,
  );
};
