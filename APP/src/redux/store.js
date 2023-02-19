import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./Slice/filterSlice";
import shoesSlice from "./Slice/shoesSlice";
import pageSlice from "./Slice/pageSlice";
import shippingSlice from "./Slice/shippingSlice";

const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        shoes: shoesSlice.reducer,
        page: pageSlice.reducer,
        shipping: shippingSlice.reducer, 
    }
})

export default store;