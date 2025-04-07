import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "../pages/Home/Home";
export type UnRead = {
    numberUnRead:number,
    userId:String[]
}

export type ChatState = {
    chats:Chat[],
    unRead:UnRead
}

const initialState:ChatState={
    chats:[],
    unRead:{
        numberUnRead:0,
        userId:[]
    }
}

export type UpdateMessage = {
    chatId:string,
    lastMessage:string,
    updatedAt:string,
    senderId:string,
    seen1?:boolean,
    seen2?:boolean
}
export type UpdateSeen={
    seenWhatAt:number,
    chatId:string,
    isSeen:boolean,
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
            const {lastMessage,updatedAt,chatId,seen1,seen2} = action.payload
            
            const index = state.chats.findIndex((chat)=>chat._id == chatId )
            if (index !== -1) {
                if(seen1!=undefined && seen2!=undefined){
                    state.chats[index] = {...state.chats[index],seen1:seen1,seen2:seen2,lastMessage:lastMessage,updatedAt:updatedAt}

                }else
                state.chats[index] = {...state.chats[index],lastMessage:lastMessage,updatedAt:updatedAt}
            }
            
        },
        updateSeen:(state,action:PayloadAction<UpdateSeen>)=>{
            const {seenWhatAt,chatId,isSeen} = action.payload
            const index = state.chats.findIndex((chat)=>chat._id == chatId)
            if(index !== -1){
                state.chats[index] = {...state.chats[index],[`seen${seenWhatAt}`]: isSeen}  
            }
        },
        setUnRead:(state,action:PayloadAction<UnRead>)=>{
            state.unRead = action.payload
        },
        increaseUnRead:(state,action:PayloadAction<string>)=>{
            if(!state.unRead.userId.includes(action.payload))
            state.unRead = {
                numberUnRead:state.unRead.numberUnRead+1,
                userId:[...state.unRead.userId,action.payload]
            }
        },
        descreaseUnRead:(state,action:PayloadAction<string>)=>{
            if(state.unRead.userId.includes(action.payload))
                state.unRead = {
                    numberUnRead:state.unRead.numberUnRead-1,
                    userId:state.unRead.userId.filter((u)=>u!=action.payload)
                }
                
            
            
        }
   
    }
})

export const {setChat,descreaseUnRead,setUnRead,increaseUnRead,addChat,updateLastMessage,updateSeen} = chatSlice.actions