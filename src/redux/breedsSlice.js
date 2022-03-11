import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const breed_page_limit = 15;

export const fetchBreeds = createAsyncThunk('breeds/getBreeds', async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/breeds?limit=${breed_page_limit}`)
    return res.data
})

export const breedsSlice = createSlice({
    name: 'breeds',
    initialState: {
        items: [],
        isLoading: false,
    },
    reducers: {},
    extraReducers: {
        [fetchBreeds.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchBreeds.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [fetchBreeds.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
    },
});

export default breedsSlice.reducer;