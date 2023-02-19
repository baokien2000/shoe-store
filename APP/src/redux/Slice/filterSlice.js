import { createSlice } from "@reduxjs/toolkit";


export default createSlice({
    name: 'filter',
    initialState: {
        search: '',
        brand: "All",
        color: "All",
        size: "All",
        sort: "price",
        ASC: true,
    },
    reducers: {
        searchFilterChange: (state, action) => {
            state.search = action.payload
        },
        brandFilterChange: (state, action) => {
            state.brand = action.payload
        },
        colorFilterChange: (state, action) => {
            state.color = action.payload
        },
        sizeFilterChange: (state, action) => {
            state.size = action.payload
        },
        sortFilterChange: (state, action) => {
            state.sort = action.payload
        },
        ascFilterChange: (state, action) => {
            state.ASC = action.payload
        },
        clearFilter: (state) => {
            return {
                search: '',
                brand: "All",
                color: "All",
                size: "All",
                sort: "price",
                ASC: true,
            }
        }
    }
})