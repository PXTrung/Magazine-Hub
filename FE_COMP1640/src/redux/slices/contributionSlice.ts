import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import {
   IContributionData,
   IContributionDetail,
} from "../../types/contribution.type";

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

export const getAllContributions = createAsyncThunk(
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

interface ContributionState {
   isLoading: boolean;
   isError: boolean;
   message: string;
   status: string;
   list: IContributionData[];
   detail: IContributionDetail | null;
}

const initialState: ContributionState = {
   isLoading: false,
   isError: false,
   message: "",
   status: "",
   list: [],
   detail: null,
};

const contributionSlice = createSlice({
   name: "contribution",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(contribute.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(contribute.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = "";
         console.log(action.payload);
      });
      builder.addCase(contribute.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message =
            (action.payload as string) || "An error occurred during login.";
      });
      builder.addCase(getAllContributions.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getAllContributions.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = "";
         state.list = action.payload?.items;
      });
      builder.addCase(getAllContributions.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message =
            (action.payload as string) || "An error occurred during login.";
      });
      builder.addCase(getContributionById.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getContributionById.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = "";
         state.detail = action.payload;
      });
      builder.addCase(getContributionById.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message =
            (action.payload as string) || "An error occurred during login.";
      });
   },
});

export default contributionSlice.reducer;
