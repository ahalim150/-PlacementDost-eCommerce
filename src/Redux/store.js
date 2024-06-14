import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import { categoriesReducer } from "./categoriesSlice";
import { brandsReducer } from "./brandsSlice";



export let store = configureStore({
    reducer:{
        counter: counterReducer,
        categories: categoriesReducer,
        brands: brandsReducer,
    }
})