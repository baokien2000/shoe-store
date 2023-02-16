import { createSlice } from "@reduxjs/toolkit";
import shoes from "../../data/shoe"
export default createSlice({
    name: 'shoes',
    initialState: [...shoes],
    reducers: {
        AddItem: (state, action) => {
            const shoe = state.find(item =>
                item.id === action.payload.id
            )
            if (shoe.cart !== 99) {
                shoe.cart += 1
            }
        },
        GetFromLocalStorage: (state) => {
            const cartList = JSON.parse(localStorage.getItem('KStore')) || [];
            return state.map(
                StateItem => cartList.find(StorageItem => StorageItem.id === StateItem.id) || StateItem
            )
        },
        AddToLocalStorage: (state) => {
            const cartList = state.filter(item => item.cart !== 0);
            localStorage.setItem('KStore', JSON.stringify(cartList))

        },
        AddInItemDetails: (state, action) => {
            const shoe = state.find(item =>
                item.id === action.payload[0].id
            )
            shoe.cart += action.payload[1]
            // if (shoe.cart !== 99) {
            // }
        },
        ReduceItem: (state, action) => {
            const shoe = state.find(item =>
                item.id === action.payload.id
            )
            shoe.cart -= 1
            // if (shoe.cart !== 1) {
            // }
        },
        clearCart: (state) => {
            return [...shoes];
        },
        removeItem: (state, action) => {
            const item = state.find(shoe => shoe.id === action.payload)
            item.cart = 0
        },

    }
})