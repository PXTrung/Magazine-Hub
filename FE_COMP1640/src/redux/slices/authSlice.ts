import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { jwtDecode } from "jwt-decode";
import { ILogin, IUserInformation } from "../../types/user.type";
import authUtils from "../../utils/auth";

export const login = createAsyncThunk(
   "login",
   async (data: ILogin, { rejectWithValue }) => {
      try {
         const res = await api.user.loginToGetToken(data);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.title);
      }
   },
);

export const register = createAsyncThunk(
   "register",
   async (data: ILogin, { rejectWithValue }) => {
      try {
         const res = await api.user.loginToGetToken(data);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.title);
      }
   },
);

interface UserLoginState {
   isLoading: boolean;
   userInfor: IUserInformation | null;
   isError: boolean;
   message: string;
   isLogin: boolean;
}

const initialState: UserLoginState = {
   isLoading: false,
   userInfor: null,
   isError: false,
   message: "",
   isLogin: authUtils.getSessionToken() ? true : false,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      destroy: () => {
         authUtils.setSessionToken();
         return { ...initialState, isLogin: false };
      },
      getCurrentUser: (state) => {
         let token = authUtils.getSessionToken() || "";
         let user = authUtils.decodeToken(token);

         if (user) {
            state.userInfor = user;
         } else return state;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(login.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(login.fulfilled, (state, action) => {
         let token = action.payload.data;
         authUtils.setSessionToken(token);

         state.isLoading = false;
         state.userInfor = authUtils.decodeToken(token);
         state.isLogin = true;
         state.message = "";
      });
      builder.addCase(login.rejected, (state, action) => {
         state.isLoading = false;
         state.isLogin = false;
         state.isError = true;
         state.message =
            (action.payload as string) || "An error occurred during login.";
      });
   },
});

export const { destroy, getCurrentUser } = authSlice.actions;
export default authSlice.reducer;
