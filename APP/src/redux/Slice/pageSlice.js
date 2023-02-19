
import { createSlice } from "@reduxjs/toolkit";
export default createSlice({
    name: 'page',
    initialState: {
        NavBarTabs: 0,
        ProductPages: 1,
        ProductPagesNum: 1,
    },
    reducers: {
        TabsChange: (state, action) => {
            state.NavBarTabs = action.payload
        },
        PagesChange: (state, action) => {
            state.ProductPages = action.payload
        },
        // PageNumChange: (state, action) => {
        //     state.ProductPages = action.payload
        // },
    }
})