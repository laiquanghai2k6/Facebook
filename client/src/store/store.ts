import { configureStore } from "@reduxjs/toolkit";
import { homeNavigateSlice } from "../slices/homeNavigateSlice";
import { userSlice } from "../slices/userSlice";

export const store = configureStore({
    reducer:{
        homeNavigate:homeNavigateSlice.reducer,
        user:userSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>
