import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'shared/api/user';
import { sessionApi } from '../api/sessionApi';

interface SessionSliceState {
  user: IUser | undefined;
  isAuthorized: boolean;
  accessToken: string | null;
}

const initialSessionState: () => SessionSliceState = () => ({
  user: undefined,
  isAuthorized: false,
  accessToken: localStorage.getItem('access_token'),
});

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialSessionState,
  reducers: {
    clearSessionData: (state) => {
      state.accessToken = null;
      state.isAuthorized = false;
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(sessionApi.endpoints.register.matchFulfilled, (state, { payload }) => {
      // TODO
      console.log(payload);
    });
    builder.addMatcher(sessionApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      // TODO
      console.log(payload);
    });
  },
});
