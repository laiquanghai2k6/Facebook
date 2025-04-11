import { createSlice,PayloadAction } from "@reduxjs/toolkit";
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
        },
        clearMessage:(state,action:PayloadAction<string>)=>{
            const filterMessage = state.message.filter((mes)=>mes.chatId != action.payload)
            state.message = filterMessage
        }
    }
 })

 export const {addMessage,clearMessage} = messengeSlice.actions