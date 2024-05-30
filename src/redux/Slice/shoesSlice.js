import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import LocalData from "../../data/shoe"
// let cartList = JSON.parse(localStorage.getItem('KStore')) || [];
// cartList = [...shoes].map(
//     StateItem => cartList.find(StorageItem => StorageItem._id === StateItem._id) || StateItem
// )

const shoesSlice = createSlice({
    name: 'shoes',
    initialState: { status: "idle", shoes: [] },
    reducers: {
        // USER
        AddItem: (state, action) => {
            const shoe = state.shoes.find(item =>
                item._id === action.payload._id
            )
            if (shoe.cart !== 99) {
                shoe.cart += 1
            }
        },

        AddToLocalStorage: (state) => {
            const cartList = state.shoes.filter(item => item.cart !== 0);
            localStorage.setItem('KStore', JSON.stringify(cartList))

        },
        AddInItemDetails: (state, action) => {
            const shoe = state.shoes.find(item =>
                item._id === action.payload[0]._id
            )
            shoe.cart += action.payload[1]
        },
        ReduceItem: (state, action) => {
            const shoe = state.shoes.find(item =>
                item._id === action.payload._id
            )
            shoe.cart -= 1

        },
        clearCart: (state) => {
            state.shoes.map(item => item.cart = 0)
            // return [];
        },
        removeItem: (state, action) => {
            const item = state.shoes.find(shoe => shoe._id === action.payload)
            item.cart = 0
        },

        // ADMIN
        addShoes: (state, action) => {
            state.shoes.push(action.payload)
        },
        deleteShoes: (state, action) => {
            state.shoes = state.shoes.filter(item => item._id !== action.payload)
        },
        updateShoes: (state, action) => {
            state.shoes = state.shoes.map(item => item._id === action.payload._id
                ? item = action.payload
                : item
            )

        }

    },// reducer

    extraReducers: builder => {
        builder.addCase(getShoesData.pending, (state, action) => {
            state.status = 'loading';
        }).addCase(getShoesData.fulfilled, (state, action) => {
            const cartList = JSON.parse(localStorage.getItem('KStore')) || [];
            const LocalStorageList = action.payload.map(
                StateItem => cartList.find(StorageItem => StorageItem._id === StateItem._id) || StateItem
            )
            state.shoes = LocalStorageList;
            state.status = 'idle'
        })
    }
})
export default shoesSlice;

export const getShoesData = createAsyncThunk('Shoes/getShoes', async () => {
    const URL = "https://kstore-api.vercel.app/shoes"
    const controller = new AbortController()
    try {
        const res = await axios({
            method: 'get',
            url: URL,
            signal: controller.signal
        });
        return res.data;
    } catch (e) {
        console.log(e.res.status)
    }

})