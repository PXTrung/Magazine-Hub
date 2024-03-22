import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { IUploadContribution } from "../../types/contribution.type";

export const contribute = createAsyncThunk(
   "contribute",
   async (data: IUploadContribution, { rejectWithValue }) => {
      try {
         const res = await api.contribution.contribute(data);
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
}

const initialState: ContributionState = {
   isLoading: false,
   isError: false,
   message: "",
   status: "",
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
   },
});

export default contributionSlice.reducer;
