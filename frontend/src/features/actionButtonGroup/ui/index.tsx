import { Menu } from '@headlessui/react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IUser } from 'entities/session';
import { FC, useMemo } from 'react';
import { userActionItems } from 'shared/custom';
import { excludeNullableValues } from 'shared/lib';
import { useAdaptiveMenuPosition } from 'shared/model';
import { DropdownListItem, IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { useProperActionHandler } from '../lib';

type MaybeAsync<T = (...args: any[]) => any> = T extends (...args: infer P) => infer R
  ? (...args: P) => Promise<R> | R
  : never;

export type ActionKey = keyof typeof userActionItems;

type UserMongoId = string;

type ActionButtonGroupOptions = {
  [P in keyof typeof userActionItems]?:
    | {
        /* дополнительный callback, который будет выполнен после основного */
        callback?: MaybeAsync;
        /* Перезаписать имеющийся callback на свой  */
        overwriteCb?: boolean;
        /* нижнее подчеркивание в меню (для разделения элементов) */
        hr?: boolean;
      }
    /* true лучше передавать чем пустой объект, хотя они будут оба валидны */
    | true;
};

export interface ActionButtonGroupProps {
  show?: boolean;
  menuClassName?: string;
  menuHeight?: number;
  btnClassName?: string;
  targetUser: IUser | UserMongoId | undefined;
  options: ActionButtonGroupOptions;
}

export const ActionButtonGroup: FC<ActionButtonGroupProps> = (props) => {
  const { targetUser, btnClassName, menuClassName, options, show } = props;
  const properHandler = useProperActionHandler(targetUser);
  const [position, btnRef] = useAdaptiveMenuPosition<HTMLButtonElement>([show], {
    menuHeight: props?.menuHeight || 700,
  });

  const optionKeys = useMemo(() => Object.keys(excludeNullableValues(options)) as ActionKey[], [options]);

  if (show === false) return null;
  console.log(position);
  return (
    <Menu as='div' className='dropdown'>
      {({ close }) => (
        <>
          <Menu.Button className={twMerge('h-10 w-10', btnClassName)} onClick={(e) => e.stopPropagation()} ref={btnRef}>
            <IconWrapper className='bg-white dark:bg-bg dark:hover:bg-icon-active-bg'>
              <MoreHorizIcon />
            </IconWrapper>
          </Menu.Button>
          <Menu.Items
            onClick={close}
            as='div'
            className={twMerge(
              'dropdown-menu !mt-0 w-[300px] p-2',
              position === 'top' ? 'bottom-10' : 'top-10',
              menuClassName,
            )}>
            {targetUser
              ? optionKeys.map((key, i) => {
                  const item = userActionItems[key];
                  const option = Object.is(options[key], true)
                    ? {}
                    : (options[key] as Exclude<ActionButtonGroupOptions[ActionKey], true>);

                  const handler = async () => {
                    if (option?.overwriteCb) {
                      await option?.callback?.();
                      return;
                    }
                    await properHandler(key)();
                    await option?.callback?.();
                  };

                  return (
                    <Menu.Item as='div' key={key}>
                      <DropdownListItem
                        as='button'
                        type='button'
                        className='h-full w-full !p-2'
                        Icon={<item.Icon />}
                        text={item.text}
                        onClick={handler}
                      />
                      {option?.hr && i !== optionKeys.length - 1 ? (
                        <hr className='my-2 h-[1px] border-none !bg-border !p-0' />
                      ) : null}
                    </Menu.Item>
                  );
                })
              : null}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
};
