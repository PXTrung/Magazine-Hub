import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "../slices/loginSlice";
import contributionReducer from "../slices/contributionSlice";

const store = configureStore({
   reducer: {
      userLogin: userLoginReducer,
      contribution: contributionReducer,
   },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
