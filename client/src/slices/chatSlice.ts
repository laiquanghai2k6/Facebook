import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "../pages/Home/Home";
export type ChatState = {
    chats:Chat[]
}

const initialState:ChatState={
    chats:[]
}

export type UpdateMessage = {
    chatId:string,
    lastMessage:string,
    createdAt:string,
    senderId:string
}
export const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        setChat:(state,action:PayloadAction<Chat[]>)=>{
            state.chats = action.payload
        },
        addChat:(state,action:PayloadAction<Chat>)=>{
            state.chats = [...state.chats,action.payload]
        },
        updateLastMessage:(state,action:PayloadAction<UpdateMessage>)=>{
            const {lastMessage,createdAt,chatId} = action.payload
            
            const index = state.chats.findIndex((chat)=>chat._id == chatId )
            if (index !== -1) {
                state.chats[index] = {...state.chats[index],lastMessage:lastMessage,createdAt:createdAt}
            }
        }
    }
})

export const {setChat,addChat,updateLastMessage} = chatSlice.actions