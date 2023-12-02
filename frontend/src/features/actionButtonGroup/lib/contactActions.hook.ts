import { openContactPageById, selectContactByUserId } from 'entities/contacts';
import { IUser, selectUserId, userUtils } from 'entities/session';
import { deleteContactThunk } from 'features/contact/delete';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { Paths } from 'shared/routing';

/**
 * @param {IUser | string} targetUser объект пользователя или его id
 * @returns функции для взаимодействия с контактом target пользователя если тот имеется.
 */
export const useContactActions = (targetUser: IUser | string) => {
  const contact = useAppSelector(selectContactByUserId(userUtils.getUserId(targetUser)));
  const my_id = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const remotelyOpenContactProfile = useCallback(() => {
    if (contact && contact.user._id) {
      dispatch(openContactPageById(contact.user._id));
    }
  }, [contact]);

  const openContactProfile = useCallback(() => {
    if (contact && contact.user._id) {
      remotelyOpenContactProfile();
    }

    navigate(Paths.contacts, { replace: true });
  }, [contact]);

  const deleteContact = useCallback(() => {
    dispatch(
      deleteContactThunk({
        deletedId: contact.user._id,
        initiatorId: my_id,
        returnUserAfter: false,
      }),
    );
  }, [contact]);

  return {
    openContactProfile,
    deleteContact,
  };
};
