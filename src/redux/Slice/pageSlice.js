
import { createSlice } from "@reduxjs/toolkit";
export default createSlice({
    name: 'page',
    initialState: {
        NavBarTabs: 0,
        ProductPages: 1,
        ProductPagesNum: 1,
        hideNavBar: true,
    },
    reducers: {
        TabsChange: (state, action) => {
            state.NavBarTabs = action.payload
        },
        PagesChange: (state, action) => {
            state.ProductPages = action.payload
        },
        setHideNavBar: (state, action) => {
            state.hideNavBar = action.payload
        }
        // PageNumChange: (state, action) => {
        //     state.ProductPages = action.payload
        // },
    }
})