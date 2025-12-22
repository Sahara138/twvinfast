import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { TUser } from "../../user.type";

export type TState = {
  user: TUser | null;
  accessToken: string | null;
};

const initialState: TState = {
  user: null,
  accessToken: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

/* ✅ Correct selectors */
export const selectUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;

const authReducer = authSlice.reducer;
export default authReducer;
