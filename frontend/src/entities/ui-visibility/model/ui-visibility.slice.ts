import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UIVisibilityState {
  openChat: boolean;
  openChatOptions: boolean;
  openSearchMessageBar: boolean;
}

const initialUIVisibilityState: UIVisibilityState = {
  openChat: false,
  openChatOptions: false,
  openSearchMessageBar: false,
};

const getIgnoredUIVisibilityStateKeys = <T extends Record<string, any>>(initialState: T): (keyof T)[] => {
  const keyList = [];
  for (const key in initialState) {
    keyList.push(key as keyof T);
  }
  return keyList;
};

export const ignoredUIVisibilityStateKeys = getIgnoredUIVisibilityStateKeys(initialUIVisibilityState);

export const uiVisibilitySlice = createSlice({
  name: 'uiVisibility',
  initialState: initialUIVisibilityState,
  reducers: {
    setOpenChat: (state, action: PayloadAction<boolean>) => {
      state.openChat = action.payload;
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

export const { setOpenChat, setOpenChatOptions, setOpenSearchMessageBar } = uiVisibilitySlice.actions;

export const selectOpenChat = (state: RootState) => state.uiVisibility.openChat;
export const selectOpenChatOptions = (state: RootState) => state.uiVisibility.openChatOptions;
export const selectOpenSearchMessageBar = (state: RootState) => state.uiVisibility.openSearchMessageBar;
