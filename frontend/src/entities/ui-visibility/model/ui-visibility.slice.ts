import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterChatText } from 'shared/custom';

interface UIVisibilityState {
  openChat: boolean;
  openContactPage: boolean;
  autoOpenContactPage: boolean;
  openChatOptions: boolean;
  openSearchMessageBar: boolean;
  chatBarFilterOption: FilterChatText;
}

const initialUIVisibilityState: UIVisibilityState = {
  openChat: false,
  openContactPage: false,
  autoOpenContactPage: true,
  openChatOptions: false,
  openSearchMessageBar: false,
  chatBarFilterOption: 'general',
};

const getIgnoredUIVisibilityStateKeys = <T extends Record<string, any>>(initialState: T): (keyof T)[] => {
  const keyList = [];
  for (const key in initialState) {
    keyList.push(key);
  }
  return keyList;
};

export const ignoredUIVisibilityStateKeys = getIgnoredUIVisibilityStateKeys(initialUIVisibilityState);

export const uiVisibilitySlice = createSlice({
  name: 'uiVisibility',
  initialState: initialUIVisibilityState,
  reducers: {
    clearUiVisibilityStateData: () => {
      return initialUIVisibilityState;
    },

    setChatBarFilterOption: (state, action: PayloadAction<FilterChatText>) => {
      state.chatBarFilterOption = action.payload;
    },

    setAutoOpenContactPage: (state, action: PayloadAction<boolean>) => {
      state.autoOpenContactPage = action.payload;
    },
    setOpenContactPage: (state, action: PayloadAction<boolean | undefined>) => {
      if (!state.autoOpenContactPage) {
        state.autoOpenContactPage = true;
      }
      state.openContactPage = action.payload ?? true;
    },
    setOpenChat: (state, action: PayloadAction<boolean | undefined>) => {
      state.openChat = action.payload ?? true;
    },
    setOpenChatOptions: (state, action: PayloadAction<boolean>) => {
      state.openChatOptions = action.payload;
    },
    setOpenSearchMessageBar: (state, action: PayloadAction<boolean>) => {
      state.openSearchMessageBar = action.payload;
    },
  },
  // extraReducers(builder) {
  //   builder.addMatcher(
  //     (action) => action === REHYDRATE,
  //     () => initialUIVisibilityState,
  //   );
  // },
});

export const {
  clearUiVisibilityStateData,
  setOpenChat,
  setOpenChatOptions,
  setOpenSearchMessageBar,
  setOpenContactPage,
  setAutoOpenContactPage,
  setChatBarFilterOption,
} = uiVisibilitySlice.actions;

export const selectOpenChat = (state: RootState) => state.uiVisibility.openChat;
export const selectOpenChatOptions = (state: RootState) => state.uiVisibility.openChatOptions;
export const selectOpenSearchMessageBar = (state: RootState) => state.uiVisibility.openSearchMessageBar;
export const selectOpenContactPage = (state: RootState) => state.uiVisibility.openContactPage;
export const selectIsAutoOpenContactPage = (state: RootState) => state.uiVisibility.autoOpenContactPage;
export const selectChatBarFilterOption = (state: RootState) => state.uiVisibility.chatBarFilterOption;
