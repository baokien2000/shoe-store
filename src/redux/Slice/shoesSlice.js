import { createSlice } from "@reduxjs/toolkit";
import shoe from "../../data/shoe"
export default createSlice({
    name: 'shoes',
    initialState: [...shoe],
    reducers: {
        AddItem: (state, action) => {
            const shoe = state.find(item =>
                item.id === action.payload.id
            )
            if (shoe.cart !== 99) {
                shoe.cart += 1
            }
        },
        ReduceItem: (state, action) => {
            const shoe = state.find(item =>
                item.id === action.payload.id
            )
            if (shoe.cart !== 1) {
                shoe.cart -= 1
            }
        },
        clearCart: (state) => {
            return [...shoe];
        },
        removeItem: (state, action) => {
            const item = state.find(shoe => shoe.id === action.payload)
            item.cart = 0
        },

    }
})