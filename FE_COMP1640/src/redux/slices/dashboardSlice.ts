import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { IFaculty } from "../../types/faculty.type";
import { ICoordinatorDashboard } from "../../types/dashboard.type";
import { StdioNull } from "child_process";

export const getCoordinatorDashboard = createAsyncThunk(
   "getCoordinatorDashboard",
   async (period: string, { rejectWithValue }) => {
      try {
         const res = await api.dashboard.getCoordinatorDashboard(period);
         return res.data;
      } catch (error: any) {
         rejectWithValue(error.response.data.title);
      }
   },
);

interface DashboardState {
   isLoading: boolean;
   isError: boolean;
   message: string;
   status: string;
   dashboard: ICoordinatorDashboard;
}

const initialState: DashboardState = {
   isLoading: false,
   isError: false,
   message: "",
   status: "",
   dashboard: {
      contributionsVsContributorsCorrelation: 0,
      percentageOfContributionByStatus: {
         Approved: 0,
         Processed: 0,
         Processing: 0,
         Published: 0,
         Rejected: 0,
      },
      top5ContributorOfFaculty: [],
      totalOfContribution: 0,
      totalOfPublishedContribution: 0,
      topContributorEmail: "",
      percentageOfFeedbackedContribution: 0,
   },
};

const dashboardSlice = createSlice({
   name: "dashboard",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getCoordinatorDashboard.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getCoordinatorDashboard.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = "";
         state.dashboard = action.payload;
      });
      builder.addCase(getCoordinatorDashboard.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message =
            (action.payload as string) || "An error occurred during login.";
      });
   },
});

export default dashboardSlice.reducer;
