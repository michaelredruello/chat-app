import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./messagesSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    user: userReducer,
  },
});
