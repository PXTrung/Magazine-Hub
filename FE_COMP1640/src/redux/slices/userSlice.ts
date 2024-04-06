import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { IUserData } from "../../types/user.type";
import { IParamsSlice, generateParams } from "../../types/filter.type";

export const getUserList = createAsyncThunk(
   "getUserList",
   async (params: IParamsSlice, { rejectWithValue }) => {
      let filter = "";

      // Thêm điều kiện nếu có facultyId
      if (params.filters?.facultyId) {
         filter += `facultyId==${params.filters.facultyId}`;
      }

      // Thêm điều kiện nếu có status
      if (params.filters?.role) {
         filter += (filter ? "," : "") + `role==${params.filters.role}`;
      }

      // Thêm điều kiện nếu có period
      if (params.filters?.period) {
         filter += (filter ? "," : "") + `periodId==${params.filters.period}`;
      }

      // Thêm điều kiện nếu có period
      // if (params.filters?.search) {
      //    filter +=
      //       (filter ? "," : "") +
      //       `(title|description)@=*${params.filters.search}`;
      // }

      try {
         const res = await api.user.getUserList(
            generateParams(
               filter,
               params?.sorts,
               params?.page,
               params?.pageSize,
            ),
         );
         return res.data;
      } catch (error: any) {
         rejectWithValue(error.response.data.title);
      }
   },
);

interface UserState {
   isLoading: boolean;
   isError: boolean;
   message: string;
   list: IUserData[];
   currentPage: number;
   totalPage: number;
}

const initialState: UserState = {
   isLoading: false,
   isError: false,
   message: "",
   list: [],
   currentPage: 1,
   totalPage: 1,
};

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getUserList.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getUserList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = "";
            state.isError = false;
            state.list = action.payload.items;
            state.totalPage = action.payload?.totalPages;
            state.currentPage = action.payload?.currentPage;
         })
         .addCase(getUserList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
               (action.payload as string) || "An error occurred during login.";
         });
   },
});

export default userSlice.reducer;
