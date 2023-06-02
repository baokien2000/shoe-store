import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        tab: 'dashboard',
        currentId: '',
        orderData: [],
        status: 'idle',
    },
    reducers: {
        setTab: (state, action) => {
            state.tab = action.payload;
        },
        setCurrentId: (state, action) => {
            state.currentId = action.payload;
        },
        addOrder: (state, action) => {
            state.orderData.push(action.payload);
        }
    },
    extraReducers: builder => {
        builder.addCase(getOrdersData.pending, (state, action) => {
            state.status = 'loading';
        }).addCase(getOrdersData.fulfilled, (state, action) => {
            state.orderData = action.payload;
            state.status = 'idle'
        })
    },

})
export default adminSlice;



export const getOrdersData = createAsyncThunk('Order/getOrders', async () => {
    const URL = "https://kstore-api.onrender.com/orders"
    const controller = new AbortController()
    try {
        const res = await axios({
            method: 'get',
            url: URL,
            signal: controller.signal,
        });
        return res.data;

    } catch (e) {
        return []
    }

})