import { configureStore } from "@reduxjs/toolkit";

import breedsSlice from "./breedsSlice";

export const store = configureStore({
    reducer: {
        breeds: breedsSlice,
    },
});