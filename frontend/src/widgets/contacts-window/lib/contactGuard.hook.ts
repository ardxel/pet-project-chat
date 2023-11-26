import { selectOpenedContactPageUserId } from 'entities/contacts';
import { selectIsAuthorized } from 'entities/session';
import { selectIsAutoOpenContactPage, selectOpenContactPage, setOpenContactPage } from 'entities/ui-visibility';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';

export const useContactGuard = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const openedContactPageId = useAppSelector(selectOpenedContactPageUserId);
  const isAutoOpenEnabled = useAppSelector(selectIsAutoOpenContactPage);
  const isOpen = useAppSelector(selectOpenContactPage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof openedContactPageId === 'string' && !isOpen && isAutoOpenEnabled) {
      dispatch(setOpenContactPage());
    }
  }, [openedContactPageId, isOpen, isAutoOpenEnabled]);

  const access = isAuthorized && isOpen;

  return access;
};
