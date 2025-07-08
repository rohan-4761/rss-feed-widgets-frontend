import { createSlice } from "@reduxjs/toolkit";
import _set from "lodash/set";

const initialState = {
  user: {
    id: "",
    user_name: "",
    user_email: "",
  },
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = {
        id: "",
        user_name: "",
        user_email: "",
      };
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
