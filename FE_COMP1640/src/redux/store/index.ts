import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "../slices/loginSlice";
// import registerReducer from '../slices/registerSlice.js'
import userReducer from "../slices/userSlice.js";

const store = configureStore({
   reducer: {
      userLoginStore: userLoginReducer,
      // register : registerReducer,
      user: userReducer,
   },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
