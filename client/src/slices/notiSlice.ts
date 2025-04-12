import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type notiType = {
    _id:string,
    updatedAt:string
    type:string,
    owner:string,
    fromUserId:string,
    toUserId:string,
    postId:string,
    linking?:string
}
type notiState = {
    notification:notiType[],
    unReadNoti:number
}

const initialState:notiState = {
    notification:[],
    unReadNoti:0
}



export const notiSlice = createSlice({
    name:'noti',
    initialState,
    reducers:{
        setNumberNoti:(state,action:PayloadAction<number>)=>{
            state.unReadNoti = action.payload
        },
        setNoti:(state,action:PayloadAction<notiType[]>)=>{
            state.notification = action.payload
        },
        addNoti:(state,action:PayloadAction<notiType>)=>{
            if(action.payload.type != 'request') state.unReadNoti +=1
            state.notification = [...state.notification,action.payload]
        },
        deleteNoti:(state,action:PayloadAction<string>)=>{
            
            const tempNoti = state.notification.filter((noti)=>noti.fromUserId != action.payload)
 
            state.notification = tempNoti

        },
        clearNoti:(state)=>{
            state.notification = []
            state.unReadNoti = 0
        },
        acceptFriend:(state,action:PayloadAction<string>)=>{
            const updateNotiIndex = state.notification.findIndex((noti)=>noti.toUserId == action.payload)
            const temp = state.notification
            temp[updateNotiIndex].type = 'success'
            state.notification = temp
            state.unReadNoti +=1
        },
        rejectFriend:(state,action:PayloadAction<string>)=>{
            const updateNotiIndex = state.notification.findIndex((noti)=>noti.toUserId == action.payload)
            const temp = state.notification
            temp[updateNotiIndex].type = 'reject'
            state.notification = temp
            state.unReadNoti +=1

        },
        
    }
})
export const {addNoti,acceptFriend,rejectFriend,deleteNoti,clearNoti,setNoti,setNumberNoti} = notiSlice.actions
