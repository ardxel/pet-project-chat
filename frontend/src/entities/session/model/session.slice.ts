import { createSlice } from '@reduxjs/toolkit';
import { IUser, SessionUserDto } from '../api';
import { sessionApi } from '../api/session.api';

type SessionSliceState = { user?: IUser; accessToken?: string; isAuthorized: boolean };

const initialSessionState: SessionSliceState = {
  isAuthorized: false,
  user: undefined,
  accessToken: undefined,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialSessionState,
  reducers: {
    clearSessionData: () => {
      return initialSessionState;
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
export const { clearSessionData } = sessionSlice.actions;