import { createSlice, Reducer } from "@reduxjs/toolkit";

export type TInitState = {
  token: string;
  isLogin: boolean;
  user: { [key: string]: unknown };
};

const initialState: TInitState = {
  token: "",
  isLogin: false,
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token } = action.payload;

      state.token = token;
      state.isLogin = Boolean(token);
    },
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
  },
});

export const { setToken, setUser } = authSlice.actions;
const authReducer: Reducer<TInitState> = authSlice.reducer;

export default authReducer;
