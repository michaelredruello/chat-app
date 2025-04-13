import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  name: string;
  avatar: string;
}

interface UserState {
  users: {
    [uid: string]: UserData;
  };
}

const initialState: UserState = {
  users: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ uid: string; name: string; avatar: string }>
    ) => {
      const { uid, name, avatar } = action.payload;
      state.users[uid] = { name, avatar };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
