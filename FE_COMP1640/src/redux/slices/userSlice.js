import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const getListUser = createAsyncThunk("getListUser", async () => {
  let res = await api.user.findAllUser();
  return res.data
});

export const deleteUser = createAsyncThunk("deleteUser", async (userId) => {
  let res = await api.user.deleteUser(userId);
  return res.data
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isError : false,
    isSuccessUser: false,
    messageUser : '',
    userList : []
  },
  reducers: {
    destroyerror: state => {
      state.isError = false;
      state.messageUser = '';
      state.isSuccessUser = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListUser.pending, (state) =>{
      state.isLoading = true;
    })
    builder.addCase(getListUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userList = [...action.payload]
    });
    builder.addCase(getListUser.rejected, (state) =>{
      state.isLoading = false;
      state.isError = true;
      state.messageUser = 'Lỗi';
    });
    builder.addCase(deleteUser.pending, (state) =>{
      state.isLoading = true;
    })
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccessUser = true;
      state.messageUser = 'Xóa thành công';
    });
    builder.addCase(deleteUser.rejected, (state) =>{
      state.isLoading = false;
      state.isError = true;
      state.messageUser = 'Lỗi';
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;