import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        usersList: [],
        status: 'idle',
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        //Admin
        addUserData: (state, action) => {
            state.usersList = action.payload
        },
        DeleteUser: (state, action) => {
            state.usersList = state.usersList.filter(user => user._id !== action.payload)
        },
    },
    extraReducers: builder => {
        builder.addCase(getUserData.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(getUserData.fulfilled, (state, action) => {
            state.usersList = action.payload
            state.status = 'idle'
        })
    }


})
export default userSlice;

export const getUserData = createAsyncThunk('User/getUser', async () => {
    const URL = "https://kstore-api.vercel.app/users"
    const controller = new AbortController()
    try {
        const res = await axios({
            method: 'get',
            url: URL,
            signal: controller.signal
        });
        return res.data;
    } catch (e) {
        return []
    }
})
