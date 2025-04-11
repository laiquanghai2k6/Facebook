import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {  UserQuickChatID } from "../component/RightHome";



type MessengerState ={
    messengerCard:Array<UserQuickChatID>,
    userOnline:UserOnline
}
export type UserOnline = {
    [userId:string]:string
}
export type UpdateOffline = {
    userId:string,
    lastOnline:number
}
const initialState:MessengerState = {
    messengerCard:[],
    userOnline:{}
}



 export const messengerSlice = createSlice({
    initialState,
    name:'messengerCard',
    reducers:{
        setMessengerCard:(state,action:PayloadAction<UserQuickChatID>)=>{

            state.messengerCard = [...state.messengerCard,action.payload]
        },
        closeMessengerCard:(state,action:PayloadAction<string>)=>{
            state.messengerCard = state.messengerCard.filter((m)=>m._id != action.payload)
        },
        fullMessengerCard:(state,action:PayloadAction<UserQuickChatID>)=>{
            state.messengerCard = state.messengerCard.slice(1)
            state.messengerCard = [...state.messengerCard,action.payload]
        },
        setCurrentOnline:(state,action:PayloadAction<UserOnline>)=>{
            state.userOnline = action.payload
        },
        clearAll:(state)=>{
            state.messengerCard = []
            state.userOnline = {}
        },
        cleatLast:(state)=>{
            state.messengerCard = state.messengerCard.slice(0,-1)
        },
        updateOfflineCard:(state,action:PayloadAction<UpdateOffline>)=>{
            const currentIndex = state.messengerCard.findIndex((mes)=>mes._id == action.payload.userId)
            if(currentIndex != -1){
                state.messengerCard[currentIndex].lastOnline = action.payload.lastOnline
            }
        }


    }
 })

 export const {cleatLast,updateOfflineCard,setMessengerCard,setCurrentOnline,clearAll,closeMessengerCard,fullMessengerCard} = messengerSlice.actions