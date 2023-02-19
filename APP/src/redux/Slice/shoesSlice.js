import { createSlice } from "@reduxjs/toolkit";
import shoes from "../../data/shoe"
let cartList = JSON.parse(localStorage.getItem('KStore')) || [];
cartList = [...shoes].map(
    StateItem => cartList.find(StorageItem => StorageItem.id === StateItem.id) || StateItem
)

const shoesSlice = createSlice({
    name: 'shoes',
    initialState: cartList,
    reducers: {
        AddItem: (state, action) => {
            const shoe = state.find(item =>
                item.id === action.payload.id
            )
            if (shoe.cart !== 99) {
                shoe.cart += 1
            }
        },
        GetFromLocalStorage: (state, action) => {
            return state.map(
                StateItem => action.payload.find(StorageItem => StorageItem.id === StateItem.id) || StateItem
            )
        },
        // AddToLocalStorage: (state) => {
        //     const cartList = state.filter(item => item.cart !== 0);
        //     localStorage.setItem('KStore', JSON.stringify(cartList))

        // },
        AddInItemDetails: (state, action) => {
            const shoe = state.find(item =>
                item.id === action.payload[0].id
            )
            shoe.cart += action.payload[1]
        },
        ReduceItem: (state, action) => {
            const shoe = state.find(item =>
                item.id === action.payload.id
            )
            shoe.cart -= 1

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
export default shoesSlice;

export function getLocalStorageData() {
    return function getData(dispatch, getState) {
        const cartList = JSON.parse(localStorage.getItem('KStore')) || [];
        dispatch(shoesSlice.actions.GetFromLocalStorage(cartList))
        // console.log(getState())

    }
}