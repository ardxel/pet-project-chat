import { Menu } from '@headlessui/react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useCallsContext } from 'entities/calls';
import { IUser, userUtils } from 'entities/session';
import { FC, useCallback, useMemo } from 'react';
import { userActionItems } from 'shared/custom';
import { excludeNullableValues } from 'shared/lib';
import { DropdownListItem, IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { useChatActions, useContactActions } from '../lib';

type FirstArgType<T> = T extends (...args: infer P) => any ? P[0] : never;

type MaybeAsync<T = (...args: any[]) => any> = T extends (...args: infer P) => infer R
  ? (...args: P) => Promise<R> | R
  : never;

type ActionKey = keyof typeof userActionItems;

type UserMongoId = string;

type ActionButtonGroupOptions = {
  [P in keyof typeof userActionItems]?:
    | {
        callback?: MaybeAsync;
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
  const { sendMessage, changeChatStatus } = useChatActions(targetUser);
  const { openContactProfile, deleteContact } = useContactActions(targetUser);
  const { callUser } = useCallsContext();

  const optionKeys = useMemo(() => Object.keys(excludeNullableValues(options)) as ActionKey[], [options]);

  const selectProperHandler: MaybeAsync = useCallback(
    (key: ActionKey) => {
      switch (key) {
        case 'audioCall':
          return callUser.bind(null, {
            isVideoCall: false,
            receiverName: userUtils.getName(targetUser),
            userId: userUtils.getUserId(targetUser),
          } as FirstArgType<typeof callUser>);

        case 'videoCall':
          return callUser.bind(null, {
            isVideoCall: true,
            receiverName: userUtils.getName(targetUser),
            userId: userUtils.getUserId(targetUser),
          } as FirstArgType<typeof callUser>);

        case 'sendMessage':
          return sendMessage;

        case 'viewProfile':
          return openContactProfile;

        case 'restoreFromArchive':
        case 'restoreFromTrash':
          return changeChatStatus.bind(null, 'common' as FirstArgType<typeof changeChatStatus>);

        case 'saveToArchive':
          return changeChatStatus.bind(null, 'archived' as FirstArgType<typeof changeChatStatus>);

        case 'deleteChat':
          return changeChatStatus.bind(null, 'trash' as FirstArgType<typeof changeChatStatus>);

        case 'deleteContact':
          return deleteContact;
        default:
          return () => console.warn('empty handler');
      }
    },
    [targetUser],
  );

  if (show === false) return null;

  return (
    <Menu as='div' className='dropdown'>
      {({ close }) => (
        <>
          <Menu.Button className={twMerge('h-10 w-10', btnClassName)}>
            <IconWrapper className='bg-white dark:bg-bg dark:hover:bg-icon-active-bg'>
              <MoreHorizIcon />
            </IconWrapper>
          </Menu.Button>
          <Menu.Items onClick={close} as='div' className={twMerge('dropdown-menu !mt-0 w-[300px] p-2', menuClassName)}>
            {targetUser
              ? optionKeys.map((key, i) => {
                  const item = userActionItems[key];
                  const option = Object.is(options?.[key], true)
                    ? {}
                    : (options?.[key] as Exclude<ActionButtonGroupOptions[ActionKey], true>);

                  const handler = async () => {
                    if (option?.rewriteCb) {
                      await option?.callback?.();
                      return;
                    }
                    await selectProperHandler(key)();
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
