import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    brands: [],
}

export let getBrands = createAsyncThunk('brands/getBrands', async () => {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");

    return data.data
})

let brandsSlice = createSlice({
    name: 'brands',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.brands = action.payload;
        })
    }
});

export let brandsReducer = brandsSlice.reducer;