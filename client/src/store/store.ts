import { configureStore } from "@reduxjs/toolkit";
import { homeNavigateSlice } from "../slices/homeNavigateSlice";

export const store = configureStore({
    reducer:{
        homeNavigate:homeNavigateSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>
