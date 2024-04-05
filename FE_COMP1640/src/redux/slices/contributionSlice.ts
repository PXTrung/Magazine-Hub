import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import {
   IContributionData,
   IContributionDetail,
} from "../../types/contribution.type";
import { generateParams } from "../../services/modules/contribution";

export type IFilter = {
   facultyId?: string;
   period?: string;
   status?: string;
   email?: string;
   search?: string;
};
export interface IParams {
   filters?: IFilter;
   sorts?: string;
   page?: number;
   pageSize?: number;
}

export const contribute = createAsyncThunk(
   "contribute",
   async (data: FormData, { rejectWithValue }) => {
      try {
         const res = await api.contribution.contribute(data);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.title);
      }
   },
);

export const getContributionByStatus = createAsyncThunk(
   "getAllContributions",
   async (filter: string, { rejectWithValue }) => {
      try {
         const res = await api.contribution.getContributionByStatus(filter);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.title);
      }
   },
);

export const getContributionById = createAsyncThunk(
   "getContributionById",
   async (id: string, { rejectWithValue }) => {
      try {
         const res = await api.contribution.getContributionById(id);
         return res.data;
      } catch (error: any) {
         rejectWithValue(error.response.data.title);
      }
   },
);

export const getContributionList = createAsyncThunk(
   "getContributionList",
   async (params: IParams, { rejectWithValue }) => {
      let filter = "";

      // Thêm điều kiện nếu có facultyId
      if (params.filters?.facultyId) {
         filter += `facultyId==${params.filters.facultyId}`;
      }

      // Thêm điều kiện nếu có status
      if (params.filters?.status) {
         filter += (filter ? "," : "") + `status==${params.filters.status}`;
      }

      // Thêm điều kiện nếu có period
      if (params.filters?.period) {
         filter += (filter ? "," : "") + `periodId==${params.filters.period}`;
      }

      // Thêm điều kiện nếu có period
      if (params.filters?.search) {
         filter += (filter ? "," : "") + `(title|description)@=*${params.filters.search}`;
      }

      try {
         const res = await api.contribution.getContributionList(
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

export const getContributionListWithToken = createAsyncThunk(
   "getContributionListWithToken",
   async (params: IParams, { rejectWithValue }) => {
      let filter = "";

      // Thêm điều kiện nếu có facultyId
      if (params.filters?.facultyId) {
         filter += `facultyId==${params.filters.facultyId}`;
      }

      // Thêm điều kiện nếu có status
      if (params.filters?.status) {
         filter += (filter ? "," : "") + `status==${params.filters.status}`;
      }

      // Thêm điều kiện nếu có period
      if (params.filters?.period) {
         filter += (filter ? "," : "") + `periodId==${params.filters.period}`;
      }

      // Thêm điều kiện nếu có email
      if (params.filters?.email) {
         filter +=
            (filter ? "," : "") + `createdByEmail==${params.filters.email}`;
      }

      try {
         const res = await api.contribution.getContributionListWithToken(
            generateParams(
               filter,
               params?.sorts,
               params?.page,
               params.pageSize ?? 100,
            ),
         );
         return res.data;
      } catch (error: any) {
         rejectWithValue(error.response.data.title);
      }
   },
);

interface ContributionState {
   isLoading: boolean;
   isError: boolean;
   message: string;
   status: string;
   list: IContributionData[];
   detail: IContributionDetail | null;
   totalPage: number;
   currentPage: number;
}

const initialState: ContributionState = {
   isLoading: false,
   isError: false,
   message: "",
   status: "",
   list: [],
   detail: null,
   totalPage: 1,
   currentPage: 1,
};

const contributionSlice = createSlice({
   name: "contribution",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(contribute.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(contribute.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.title;
            console.log(action.payload);
         })
         .addCase(contribute.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
               (action.payload as string) || "An error occurred during login.";
         });
      builder
         .addCase(getContributionByStatus.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getContributionByStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = "";
            state.list = action.payload?.items;
            state.totalPage = action.payload?.totalPages;
            state.currentPage = action.payload?.currentPage;
         })
         .addCase(getContributionByStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
               (action.payload as string) || "An error occurred during login.";
         });
      builder
         .addCase(getContributionById.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getContributionById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = "";
            state.detail = action.payload;
         })
         .addCase(getContributionById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
               (action.payload as string) || "An error occurred during login.";
         });
      builder
         .addCase(getContributionList.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getContributionList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = "";
            state.list = action.payload?.items;
            state.totalPage = action.payload?.totalPages;
            state.currentPage = action.payload?.currentPage;
         })
         .addCase(getContributionList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
               (action.payload as string) || "An error occurred during login.";
         });
      builder
         .addCase(getContributionListWithToken.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getContributionListWithToken.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = "";
            state.list = action.payload?.items;
            state.totalPage = action.payload?.totalPages;
            state.currentPage = action.payload?.currentPage;
         })
         .addCase(getContributionListWithToken.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
               (action.payload as string) || "An error occurred during login.";
         });
   },
});

export default contributionSlice.reducer;
