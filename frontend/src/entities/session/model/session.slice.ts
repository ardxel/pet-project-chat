import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../api';
import { sessionApi } from '../api/session.api';
import { SessionUserDto } from './api';

export type ChatSocketConnectionStatus = 'connected' | 'loading' | 'stop';

type SessionSliceState = {
  user?: IUser;
  accessToken?: string;
  isAuthorized: boolean;
  _app_v: number;
  chatSocketConnectionStatus: ChatSocketConnectionStatus;
};

export const initialSessionState: SessionSliceState = {
  isAuthorized: false,
  user: undefined,
  accessToken: undefined,
  _app_v: 1,
  chatSocketConnectionStatus: 'stop',
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialSessionState,
  reducers: {
    clearSessionData: () => {
      return initialSessionState;
    },

    changeSocketStatus: (state, action: PayloadAction<ChatSocketConnectionStatus>) => {
      state.chatSocketConnectionStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        sessionApi.endpoints.register.matchFulfilled(action) || sessionApi.endpoints.login.matchFulfilled(action),
      (state: SessionSliceState, { payload }: { payload: SessionUserDto }) => {
        state.isAuthorized = true;
        state.accessToken = payload.token;
        state.user = payload.user;
      },
    );
    builder.addMatcher(
      (action) => sessionApi.endpoints.update.matchFulfilled(action),
      (state: SessionSliceState, { payload }) => {
        state.user = payload as IUser;
      },
    );
    builder.addMatcher(
      (action) => sessionApi.endpoints.changePassword.matchFulfilled(action),
      (state: SessionSliceState, { payload }) => {
        // state.user = payload as IUser;
      },
    );
  },
});

export const selectAccessToken = (state: RootState) => state.session.accessToken;
export const selectIsAuthorized = (state: RootState) => state.session.isAuthorized;
export const selectUserId = (state: RootState) => state.session?.user._id;
export const selectUserData = (state: RootState) => state.session.user;
export const selectSocketStatus = (state: RootState) => state.session.chatSocketConnectionStatus;
export const selectIsSocketConnected = (state: RootState) => state.session.chatSocketConnectionStatus === 'connected';
export const selectIsSocketStop = (state: RootState) => state.session.chatSocketConnectionStatus === 'stop';
export const { clearSessionData, changeSocketStatus } = sessionSlice.actions;
