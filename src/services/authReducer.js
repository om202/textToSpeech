import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "authentication",
  initialState: {
    authUser: null,
    authError: null,
    authStatus: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.authUser = action.payload;
    },
    loginError: (state, action) => {
      state.authError = action.payload;
    },
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
  },
});

export const {
  loginSuccess,
  loginError,
  setAuthStatus,
} = auth.actions;

const authReducer = auth.reducer;
export { authReducer };