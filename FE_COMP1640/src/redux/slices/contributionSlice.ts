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

export const getContributionByFaculty = createAsyncThunk(
   "getContributionByFaculty",
   async (id: string, { rejectWithValue }) => {
      try {
         const res = await api.contribution.getContributionByFaculty(
            `facultyId==${id}`,
         );
         return res.data;
      } catch (error: any) {
         rejectWithValue(error.response.data.title);
      }
   },
);

export const getContributionByPagination = createAsyncThunk(
   "getContributionsByPagination",
   async (endpoint: string, { rejectWithValue }) => {
      try {
         const res = await api.contribution.getContributionByPagination(endpoint);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.title);
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
   nextPageLink: string;
   prevPageLink: string;

}

const initialState: ContributionState = {
   isLoading: false,
   isError: false,
   message: "",
   status: "",
   list: [],
   detail: null,
   nextPageLink: "",
   prevPageLink: "",
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
      builder.addCase(getContributionByStatus.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getContributionByStatus.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = "";
         state.list = action.payload?.items;
         state.nextPageLink = action.payload?.nextPage;
      });
      builder.addCase(getContributionByStatus.rejected, (state, action) => {
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
      builder.addCase(getContributionByFaculty.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getContributionByFaculty.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = "";
         state.detail = action.payload?.items;
      });
      builder.addCase(getContributionByFaculty.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message =
            (action.payload as string) || "An error occurred during login.";
      });
      builder.addCase(getContributionByPagination.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getContributionByPagination.fulfilled, (state, action) => {
         state.isLoading = false;
         state.detail = action.payload?.items;
         state.nextPageLink = action.payload?.nextPage;

      })
   },
});

export default contributionSlice.reducer;
