import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selectOpenSearchMessageBar, setOpenSearchMessageBar } from 'entities/ui-visibility';
import { FC, PureComponent, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { IconWrapper, SearchInput } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { useMessageNavigation } from 'widgets/chat-window/lib';

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
        `absolute left-0 right-0 top-0 z-[999] w-full border-b border-border bg-bg transition-all duration-500 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`,
      )}>
      <div className='flex h-full w-full items-center p-1 px-4   '>
        <SearchInput
          value={searchValue}
          onChange={onSearch}
          wrapperClassName='w-full h-full [&>svg]:w-6 [&>svg]:h-6'
          placeholder='Искать в этом чате'
          className='h-full w-full rounded-md border-none bg-bg pl-12 focus:bg-bg dark:focus:bg-bg'
        />
        <div className='min-w-16 mr-2 flex h-9 w-16 max-w-[50px] items-center justify-center rounded-md border border-border'>
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

interface BtnMessageBarProps {
  onClick: () => void;
  disabled?: boolean;
}

class DecreaseIndexButton extends PureComponent<BtnMessageBarProps> {
  render() {
    return (
      <button onClick={this.props.onClick} disabled={this.props.disabled}>
        <IconWrapper className='h-8 w-8 rounded-md bg-transparent hover:bg-icon-active-bg'>
          <ExpandLessIcon className='!h-6 !w-6' />
        </IconWrapper>
      </button>
    );
  }
}

class IncreaseIndexButton extends PureComponent<BtnMessageBarProps> {
  render(): ReactNode {
    return (
      <button onClick={this.props.onClick} disabled={this.props.disabled}>
        <IconWrapper className='h-8 w-8 rounded-md bg-transparent hover:bg-icon-active-bg'>
          <ExpandMoreIcon className='!h-6 !w-6' />
        </IconWrapper>
      </button>
    );
  }
}

class CloseMessageBarButton extends PureComponent<BtnMessageBarProps> {
  render() {
    return (
      <button className='ml-2' onClick={this.props.onClick}>
        <IconWrapper className='h-9 w-9 rounded-md'>
          <CloseIcon className='!h-6 !w-6' />
        </IconWrapper>
      </button>
    );
  }
}
