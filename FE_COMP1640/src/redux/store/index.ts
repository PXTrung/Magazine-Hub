import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import contributionReducer from "../slices/contributionSlice";
import facultyReducer from "../slices/facultySlice";

const store = configureStore({
   reducer: {
      auth: authReducer,
      contribution: contributionReducer,
      faculty: facultyReducer,
   },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
