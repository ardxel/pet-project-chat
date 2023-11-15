import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser, SessionUserDto } from '../api';
import { sessionApi } from '../api/session.api';

export type ChatSocketConnectionStatus = 'connected' | 'loading' | 'stop';

type SessionSliceState = {
  user?: IUser;
  accessToken?: string;
  isAuthorized: boolean;
  chatSocketConnectionStatus: ChatSocketConnectionStatus;
};

export const initialSessionState: SessionSliceState = {
  isAuthorized: false,
  user: undefined,
  accessToken: undefined,
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
  },
});

export const selectAccessToken = (state: RootState) => state.session.accessToken;
export const selectIsAuthorized = (state: RootState) => state.session.isAuthorized;
export const selectUserId = (state: RootState) => state.session?.user._id;
export const selectSocketStatus = (state: RootState) => state.session.chatSocketConnectionStatus;

export const { clearSessionData, changeSocketStatus } = sessionSlice.actions;
