import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { jwtDecode } from "jwt-decode";

export const login = createAsyncThunk(
   "login",
   async (data: object, { rejectWithValue }) => {
      try {
         const res = await api.user.loginToGetToken(data);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.title);
      }
   },
);

interface UserInformation {
   firstName: string;
   lastName: string;
   role: string;
   email: string;
   token: string;
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
         const token = action.payload.data;
         let userData: any = jwtDecode(token);

         state.isLoading = false;
         state.userInfor = {
            firstName:
               userData[
                  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
               ],
            lastName:
               userData[
                  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
               ],
            role: userData[
               "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
            email: userData[
               "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ],
            token: token,
         };

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

export default userLoginSlice.reducer;
