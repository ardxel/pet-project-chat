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

export const uiVisitibilySlice = createSlice({
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
    }
  },
});

export const {setOpenChat, setOpenChatOptions, setOpenSearchMessageBar} = uiVisitibilySlice.actions;

export const selectOpenChat = (state: RootState) => state.uiVisibility.openChat;
export const selectOpenChatOptions = (state: RootState) => state.uiVisibility.openChatOptions;
export const selectOpenSearchMessageBar = (state: RootState) => state.uiVisibility.openSearchMessageBar;