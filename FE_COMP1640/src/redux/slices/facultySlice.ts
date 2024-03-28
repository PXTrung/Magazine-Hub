import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { IFaculty } from "../../types/faculty.type";

export const getFaculty = createAsyncThunk("getFaculty", async () => {
   try {
      const res = await api.faculty.getFaculty();
      return res.data;
   } catch (error: any) {
      return error.response.data.title;
   }
});

interface ContributionState {
   isLoading: boolean;
   isError: boolean;
   message: string;
   status: string;
   list: IFaculty[];
}

const initialState: ContributionState = {
   isLoading: false,
   isError: false,
   message: "",
   status: "",
   list: [],
};

const facultySlice = createSlice({
   name: "faculty",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getFaculty.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getFaculty.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = "";
         state.list = action.payload.items;
      });
      builder.addCase(getFaculty.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message =
            (action.payload as string) || "An error occurred during login.";
      });
   },
});

export default facultySlice.reducer;
