import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { UserQuickChat, UserQuickChatID } from "../component/RightHome";
import { Message } from "../component/MessengerDownCard";



type MessengeState ={
    message:Message[]
}


const initialState:MessengeState = {
    message:[]
}



 export const messengeSlice = createSlice({
    initialState,
    name:'messenge',
    reducers:{
        addMessage:(state,action:PayloadAction<Message>)=>{
            state.message = [action.payload,...state.message]
        }
    }
 })

 export const {addMessage} = messengeSlice.actions