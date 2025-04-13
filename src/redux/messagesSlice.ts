import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: string;
  text: string;
  uid: string;
  createdAt: Date;
  displayName: string;
  photoURL?: string;
}

const initialState: Message[] = [];

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      return action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.push(action.payload);
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
