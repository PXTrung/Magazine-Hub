import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";
import { jwtDecode } from "jwt-decode";

interface LoginResponse {
   message: string;
   data: string;
}

export const login = createAsyncThunk(
   "login",
   async (data: object, { rejectWithValue }) => {
      try {
         const res = await api.user.loginToGetToken(data);
         return res.data as LoginResponse;
      } catch (error) {
         return rejectWithValue("Email or password is wrong, or you didn't verify your email"); // Pass error message to rejected action
      }
   },
);

interface UserInformation {
   // Define the structure of user information
}

interface UserLoginState {
   isLoading: boolean;
   userInfor: UserInformation | null;
   isError: boolean;
   message: string;
   isLogin: boolean;
}

const initialState: UserLoginState = {
   isLoading: false,
   userInfor: null,
   isError: false,
   message: "",
   isLogin: false,
};

const userLoginSlice = createSlice({
   name: "login",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(login.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(login.fulfilled, (state, action) => {
         state.isLoading = false;
         const token = action.payload.data;
         localStorage.setItem("jwtToken", token); // Store token in localStorage
         state.userInfor = jwtDecode(token); // Decode token and store user info
         state.isLogin = true;
      });
      builder.addCase(login.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload as string; // Set error message
      });
   },
});

export default userLoginSlice.reducer;
