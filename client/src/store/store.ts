import { configureStore } from "@reduxjs/toolkit";
import { homeNavigateSlice } from "../slices/homeNavigateSlice";
import { userSlice } from "../slices/userSlice";
import { postSlice } from "../slices/postSlice";
import { commentSlice } from "../slices/commentSlice";
import { messengerSlice } from "../slices/messengerSlice";
import { chatSlice } from "../slices/chatSlice";
import { messengeSlice } from "../slices/messageSlice";
import { notiSlice } from "../slices/notiSlice";
import { tokenSlice } from "../slices/tokenSlice";


export const store = configureStore({
    reducer:{
        homeNavigate:homeNavigateSlice.reducer,
        user:userSlice.reducer,
        post:postSlice.reducer,
        comment:commentSlice.reducer,
        messengerCard:messengerSlice.reducer,
        chats:chatSlice.reducer,
        message:messengeSlice.reducer,
        notification:notiSlice.reducer,
        accessToken:tokenSlice.reducer

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>
