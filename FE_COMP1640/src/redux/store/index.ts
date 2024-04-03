import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import contributionReducer from "../slices/contributionSlice";
import facultyReducer from "../slices/facultySlice";
import feedbackReducer from "../slices/feedbackSlide"
import periodReducer from "../slices/periodSlide";

const store = configureStore({
   reducer: {
      auth: authReducer,
      contribution: contributionReducer,
      faculty: facultyReducer,
      feedback: feedbackReducer,
      period: periodReducer,
   },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
