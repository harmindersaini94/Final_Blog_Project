import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userdata: null,
  loginStatus: false,
};

const slice = createSlice({
  name: "HomestaySlice",
  initialState: initialState,

  reducers: {
    login: (state, action) => {
      state.userdata = action.payload.userdata;
      state.loginStatus = true;
    },
    logout: (state, action) => {
      state.userdata = null;
      state.loginStatus = false;
    },
  },
});

export const { login, logout } = slice.actions;
export default slice.reducer;
