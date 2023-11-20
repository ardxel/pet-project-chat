import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selectOpenSearchMessageBar, setOpenSearchMessageBar } from 'entities/ui-visibility';
import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { IconWrapper, SearchInput } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { useMessageNavigation } from 'widgets/chat-window/lib';

interface BtnMessageBarProps {
  onClick: () => void;
  disabled?: boolean;
}

const DecreaseIndexButton: FC<BtnMessageBarProps> = memo(({ onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      <IconWrapper className='w-8 h-8 bg-transparent hover:bg-icon-active-bg rounded-md'>
        <ExpandLessIcon className='!w-6 !h-6' />
      </IconWrapper>
    </button>
  );
});
const IncreaseIndexButton: FC<BtnMessageBarProps> = memo(({ onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      <IconWrapper className='w-8 h-8 bg-transparent hover:bg-icon-active-bg rounded-md'>
        <ExpandMoreIcon className='!w-6 !h-6' />
      </IconWrapper>
    </button>
  );
});

const CloseMessageBarButton: FC<BtnMessageBarProps> = memo(({ onClick }) => {
  return (
    <button className='ml-2' onClick={onClick}>
      <IconWrapper className='w-9 h-9 rounded-md'>
        <CloseIcon className='!w-6 !h-6' />
      </IconWrapper>
    </button>
  );
});

interface SearchMessageBarProps
  extends FC<{
    onSelectIndex: (index: number) => void;
  }> {}

export const SearchMessageBar: SearchMessageBarProps = ({ onSelectIndex }) => {
  const { uiCountImplementation, onDecrease, onIncrease, onSearch, searchValue } = useMessageNavigation(onSelectIndex);
  const isOpen = useAppSelector(selectOpenSearchMessageBar);

  const dispatch = useAppDispatch();
  return (
    <div
      className={twMerge(
        `absolute w-full top-0 left-0 right-0 z-[999] bg-bg border-border border-b transition-all duration-500 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`,
      )}>
      <div className='w-full h-full flex items-center p-1 px-4   '>
        <SearchInput
          value={searchValue}
          onChange={onSearch}
          wrapperClassName='w-full h-full [&>svg]:w-6 [&>svg]:h-6'
          placeholder='Искать в этом чате'
          className='rounded-md pl-12 w-full border-none dark:focus:bg-bg bg-bg focus:bg-bg h-full'
        />
        <div className='min-w-16 w-16 max-w-[50px] h-9 flex justify-center items-center rounded-md border border-border mr-2'>
          <p className='text-center'>{uiCountImplementation}</p>
        </div>
        <div className='flex items-center'>
          <DecreaseIndexButton onClick={onDecrease} />
          <IncreaseIndexButton onClick={onIncrease} />
        </div>
        <CloseMessageBarButton onClick={() => dispatch(setOpenSearchMessageBar(false))} />
      </div>
    </div>
  );
};
