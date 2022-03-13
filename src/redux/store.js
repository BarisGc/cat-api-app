import { configureStore } from "@reduxjs/toolkit";

import breedsSlice from "./breedsSlice";
import imageGallerySlice from "./imageGallerySlice";

export const store = configureStore({
    reducer: {
        breeds: breedsSlice,
        imageGallery: imageGallerySlice
    },
});