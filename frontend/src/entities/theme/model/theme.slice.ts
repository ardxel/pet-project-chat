import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Theme } from './types';

type ThemeSliceState = {
  currentTheme: Theme;
};

export const initialThemeState: ThemeSliceState = {
  currentTheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: () => initialThemeState,
  reducers: {
    changeTheme: (state, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload;
    },
  },
});

export const selectCurrentTheme = (state: RootState) => state.theme.currentTheme;

export const { changeTheme } = themeSlice.actions;
