import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import shoes from "../../data/shoe"
// let cartList = JSON.parse(localStorage.getItem('KStore')) || [];
// cartList = [...shoes].map(
//     StateItem => cartList.find(StorageItem => StorageItem._id === StateItem._id) || StateItem
// )

const shoesSlice = createSlice({
    name: 'shoes',
    initialState: { status: "idle", shoes: [] },
    reducers: {
        AddItem: (state, action) => {
            const shoe = state.shoes.find(item =>
                item._id === action.payload._id
            )
            if (shoe.cart !== 99) {
                shoe.cart += 1
            }
        },
        // GetFromLocalStorage: (state, action) => {
        //     return state.shoes.map(
        //         StateItem => action.payload.find(StorageItem => StorageItem._id === StateItem._id) || StateItem
        //     )
        // },
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

    },// reducer

    extraReducers: builder => {
        builder.addCase(getDataFromMongo.pending, (state, action) => {
            state.status = 'loading';
        }).addCase(getDataFromMongo.fulfilled, (state, action) => {
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

export function getLocalStorageData() {
    return function getData(dispatch, getState) {
        const cartList = JSON.parse(localStorage.getItem('KStore')) || [];

        dispatch(shoesSlice.actions.GetFromLocalStorage(cartList))
        // console.log(getState())

    }
}

export const getDataFromMongo = createAsyncThunk('Shoes/getShoes', async () => {
    const res = await fetch("http://localhost:5000/shoes")
    const data = res.json()
    return data
    // console.log(data)
    // return res
})