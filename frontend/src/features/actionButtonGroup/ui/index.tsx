import { Menu } from '@headlessui/react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useCallsContext } from 'entities/calls';
import { IUser, userUtils } from 'entities/session';
import { FC, useCallback, useMemo } from 'react';
import { userActionItems } from 'shared/custom';
import { DropdownListItem, IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { useChatActions, useContactActions } from '../lib';

type ActionKey = keyof typeof userActionItems;
type UserMongoId = string;
type ActionButtonGroupOptions<T = typeof userActionItems> = {
  [P in keyof T]?:
    | {
        callback?: (...args: unknown[]) => unknown;
        rewriteCb?: boolean;
        hr?: boolean;
      }
    | true;
};

export interface ActionButtonGroupProps {
  show?: boolean;
  menuClassName?: string;
  btnClassName?: string;
  targetUser: IUser | UserMongoId | undefined;
  options?: ActionButtonGroupOptions;
}

export const ActionButtonGroup: FC<ActionButtonGroupProps> = ({
  show,
  targetUser,
  options,
  btnClassName,
  menuClassName,
}) => {
  const { sendMessage } = useChatActions(targetUser);
  const { openContactProfile } = useContactActions(targetUser);
  const { callUser } = useCallsContext();

  const optionKeys = useMemo(() => Object.keys(options) as ActionKey[], [options]);

  const selectProperHandler = useCallback(
    (key: ActionKey) => {
      switch (key) {
        case 'audioCall':
          return callUser.bind(
            null,
            ...([
              {
                isVideoCall: false,
                receiverName: userUtils.getName(targetUser),
                userId: userUtils.getUserId(targetUser),
              },
            ] as Parameters<typeof callUser>),
          );
        case 'videoCall':
          return callUser.bind(
            null,
            ...([
              {
                isVideoCall: true,
                receiverName: userUtils.getName(targetUser),
                userId: userUtils.getUserId(targetUser),
              },
            ] as Parameters<typeof callUser>),
          );
        case 'sendMessage':
          return sendMessage;
        case 'viewProfile':
          return openContactProfile;
        default:
          return undefined;
      }
    },
    [targetUser],
  );

  if (show === false) return null;

  return (
    <Menu as='div' className='dropdown'>
      {({ close }) => (
        <>
          <Menu.Button className={twMerge('w-10 h-10', btnClassName)}>
            <IconWrapper className='bg-white dark:bg-bg dark:hover:bg-icon-active-bg'>
              <MoreHorizIcon />
            </IconWrapper>
          </Menu.Button>
          <Menu.Items onClick={close} as='div' className={twMerge('dropdown-menu !mt-0 p-2 w-[300px]', menuClassName)}>
            {targetUser
              ? optionKeys.map((key, i) => {
                  const item = userActionItems[key];
                  const option = Object.is(options?.[key], true)
                    ? {}
                    : (options?.[key] as Exclude<ActionButtonGroupOptions[ActionKey], true>);

                  const handler = async () => {
                    if (option?.rewriteCb === true) {
                      option?.callback ? option.callback() : void 1;
                      return;
                    }
                    await selectProperHandler(key)();
                    option?.callback ? option.callback() : void 1;
                  };

                  return (
                    <Menu.Item as='div' key={key}>
                      <DropdownListItem
                        as='button'
                        type='button'
                        className='!p-2 w-full h-full'
                        Icon={<item.Icon />}
                        text={item.text}
                        onClick={handler}
                      />
                      {option?.hr && i !== optionKeys.length - 1 ? (
                        <hr className='my-2 !p-0 !bg-border h-[1px] border-none' />
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
