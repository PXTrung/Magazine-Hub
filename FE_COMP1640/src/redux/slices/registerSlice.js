import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const register = createAsyncThunk("register", async (newUser) => {
    const res = await api.user.createUser(newUser);
    return res;
});

const registerSlice = createSlice({
    name: "register",
    initialState: {
        isLoading: false,
        userData: {
            id: 0,
            userName: '',
            password: '',
            isAdmin: false,
            fullName: '',
            email: '',
            avatar: '',
            cart: [],
        },
        isError: false,
        isSuccess: false,
        registerMessage: ''
    },
    reducers: {
        destroyerror: state => {
            state.isError = false;
            state.registerMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
            state.registerMessage = 'Đăng ký thành công';
            state.isSuccess = true;
        });
        builder.addCase(register.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.registerMessage = 'Đăng ký không thành công';
        });
    },
});

export const registerActions = registerSlice.actions;

export default registerSlice.reducer;