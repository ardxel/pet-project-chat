import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

const CategoryListMarkAsRead = () => {
  return (
    <div className='border-b border-border flex flex-col gap-y-3'>
      <button className='flex list-item-in-dropdown'>
        <CheckIcon />
        <p>Пометить как прочитанное</p>
      </button>
      <button className='flex list-item-in-dropdown'>
        <NotificationsNoneOutlinedIcon />
        <p>Отключить оповещения</p>
      </button>
      <button className='flex list-item-in-dropdown'>
        <PersonOutlineOutlinedIcon />
        <p>Посмотреть профиль</p>
      </button>
    </div>
  );
};

const CatergoryListCommunications = () => {
  return (
    <div className='border-b border-border flex flex-col gap-y-3'>
      <button className='flex list-item-in-dropdown'>
        <LocalPhoneOutlinedIcon />
        <p>Аудио звонок</p>
      </button>
      <button className='flex list-item-in-dropdown'>
        <VideocamOutlinedIcon />
        <p>Видео звонок</p>
      </button>
    </div>
  );
};

const CategoryListActions = () => {
  return (
    <div className='border-b border-border flex flex-col gap-y-3'>
      <button className='flex list-item-in-dropdown'>
        <UnarchiveOutlinedIcon />
        <p>Архив</p>
      </button>
      <button className='flex list-item-in-dropdown'>
        <DeleteOutlineOutlinedIcon />
        <p>Корзина</p>
      </button>
      <button className='flex list-item-in-dropdown'>
        <ReportProblemOutlinedIcon />
        <p>Пожаловаться</p>
      </button>
    </div>
  );
};

export { CategoryListActions, CategoryListMarkAsRead, CatergoryListCommunications };
