import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const breed_page_limit = 10;

export const fetchBreeds = createAsyncThunk('breeds/getBreeds', async (page) => {
    const res = await axios(
        `${process.env.REACT_APP_API_BASE_ENDPOINT}/breeds?page=${page ? page : 0}&limit=${breed_page_limit}`)
    return res.data
})

export const breedsSlice = createSlice({
    name: 'breeds',
    initialState: {
        items: [],
        status: 'idle',
        page: 0,
        hasNextPage: true,
    },
    reducers: {},
    extraReducers: {
        [fetchBreeds.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchBreeds.fulfilled]: (state, action) => {
            state.items = [...state.items, ...action.payload];
            state.status = 'succeeded';
            state.page += 1;

            action.payload.length < breed_page_limit ? state.hasNextPage = false : state.hasNextPage = true
        },
        [fetchBreeds.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    },
});

export default breedsSlice.reducer;