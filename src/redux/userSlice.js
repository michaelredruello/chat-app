import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { uid, name, avatar } = action.payload;
      state.users[uid] = { name, avatar };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
