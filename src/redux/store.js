import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./Slice/filterSlice";
import shoesSlice from "./Slice/shoesSlice";
import pageSlice from "./Slice/pageSlice";
import shippingSlice from "./Slice/shippingSlice";
import adminSlice from "./Slice/adminSlice";
import userSlice from "./Slice/userSlice";

const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        shoes: shoesSlice.reducer,
        page: pageSlice.reducer,
        shipping: shippingSlice.reducer, 
        admin: adminSlice.reducer,
        user: userSlice.reducer,
    }
})

export default store;