import { createSlice } from '@reduxjs/toolkit';
import { UserDto } from '../api';
import { sessionApi } from '../api/session.api';

interface SessionSliceState {
  user?: UserDto;
  isAuthorized: boolean;
  accessToken?: string;
}

const initialSessionState: () => SessionSliceState = () => ({
  isAuthorized: false,
});

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialSessionState,
  reducers: {
    clearSessionData: (state) => {
      state.accessToken = undefined;
      state.isAuthorized = false;
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(sessionApi.endpoints.register.matchFulfilled, (state, { payload }) => {
      // TODO
      state.accessToken = payload.token;
      state.user = payload.user;
      state.isAuthorized = true;
    });
    builder.addMatcher(sessionApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      console.log('session.slice activated');
      // TODO
      state.accessToken = payload.token;
      state.user = payload.user;
      state.isAuthorized = true;
    });
  },
});
