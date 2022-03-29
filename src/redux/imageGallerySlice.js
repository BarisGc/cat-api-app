import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPhotos = createAsyncThunk('image_gallery/getAllPhotos', async () => {
    const res = await axios(
        `${process.env.REACT_APP_API_BASE_ENDPOINT}/images/search?limit=30&order=ASC`)
    return res.data
});

export const imageGallerySlice = createSlice({
    name: 'imageGallery',
    initialState: {
        items: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: {
        [fetchAllPhotos.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'succeeded'
        },
        [fetchAllPhotos.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchAllPhotos.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    },
});

export const imageGallerySelector = (state) => state.imageGallery.items;
export const statusSelector = (state) => state.imageGallery.status;
export const errorSelector = (state) => state.imageGallery.error;

export default imageGallerySlice.reducer;
