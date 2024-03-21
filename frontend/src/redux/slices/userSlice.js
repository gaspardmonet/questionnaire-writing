import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

const initialState = {
  userInfo: {},
  token: "",
  message: {
    status: "",
    content: ""
  },
  loginErrorMessage: "",
  updatePasswordErrorMessage: "",
}

export const loginAdmin = createAsyncThunk(
  "admin/login",
  async (payload) => {
    console.log(payload);
    const res = await http.post("admin/login", payload);
    return res.data;
  }
)
export const updatePassword = createAsyncThunk(
  "admin/update/password",
  async (payload) => {
    console.log(payload);
    const res = await http.put("admin/update/password", payload);
    return res.data;
  }
)
export const loginWithToken = createAsyncThunk(
  "admin/loginWithToken",
  async () => {
    const res = await http.get("admin/login");
    return res.data;
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserStore: (state) => {
      state.userInfo = null;
      state.token = "";
      state.message = {
        status: 0,
        content: ""
      };
      localStorage.removeItem("token");
    },
    resetMessage: (state) => {
      state.message.status = 0;
      state.message.content = "";
      state.loginErrorMessage = "";
      state.updatePasswordErrorMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.userInfo = { ...action.payload.payload.user };
        state.token = action.payload.payload.token;
        localStorage.setItem("token", action.payload.payload.token);
        state.message.status = 200;
        state.message.content = action.payload.message;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.message.status = 401;
        state.message.content = action.error.message;
        state.loginErrorMessage = 'パスワードが正しくありません。';
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.userInfo = { ...action.payload.user };
        state.message.status = 200;
        state.message.content = action.payload.message;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.message.status = 401;
        state.message.content = action.error.message;
        state.updatePasswordErrorMessage = 'パスワードが正しくありません。';
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.userInfo = { ...action.payload.payload.user };
        state.token = action.payload.payload.token;
        localStorage.setItem("token", action.payload.payload.token);
      })
  }
});

export const { resetUserStore, resetMessage } = userSlice.actions;
export default userSlice.reducer;