import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { IPeriod } from "../../types/period.type";

export const getPeriod = createAsyncThunk("getPeriod", async () => {
   try {
      const res = await api.period.getPeriod();
      return res.data;
   } catch (error: any) {
      return error.response.data.title;
   }
});

interface PeriodState {
   isLoading: boolean;
   isError: boolean;
   message: string;
   period: IPeriod[];
}

const initialState: PeriodState = {
   isLoading: false,
   isError: false,
   message: "",
   period: [],
};

const periodSlide = createSlice({
   name: "period",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getPeriod.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getPeriod.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = "";
            state.period = action.payload.items;
         })
         .addCase(getPeriod.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
         });
   },
});

export default periodSlide.reducer;
