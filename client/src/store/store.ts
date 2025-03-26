import { configureStore } from "@reduxjs/toolkit";
import { homeNavigateSlice } from "../slices/homeNavigateSlice";
import { userSlice } from "../slices/userSlice";
import { postSlice } from "../slices/postSlice";
import { commentSlice } from "../slices/commentSlice";


export const store = configureStore({
    reducer:{
        homeNavigate:homeNavigateSlice.reducer,
        user:userSlice.reducer,
        post:postSlice.reducer,
        comment:commentSlice.reducer,

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>
