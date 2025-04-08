import { RootState } from "../store/store";
import { createSelector } from "reselect";


const chatSelect = (state:RootState)=>state.chats.chats

export const selectSeenChatParam =(chatId:string)=>{
    return createSelector(
        [chatSelect],
        (chats)=>{
            const currentIndex = chats.findIndex((chat)=>chat._id == chatId)
            if(currentIndex != -1){
                return {seen1:chats[currentIndex].seen1,seen2:chats[currentIndex].seen2}
            }else
                return null
        }
    )
} 