import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    categories: [],
}

export let getCategories = createAsyncThunk('categories/getCategories', async () => {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");

    return data.data
})

let categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        })
    }
});

export let categoriesReducer = categoriesSlice.reducer;