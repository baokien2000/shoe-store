import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./Slice/filterSlice";
import shoesSlice from "./Slice/shoesSlice";
import pageSlice from "./Slice/pageSlice";

const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        shoes: shoesSlice.reducer,
        page: pageSlice.reducer,

    }
})

export default store;