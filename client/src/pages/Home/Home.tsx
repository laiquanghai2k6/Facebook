import { useDispatch, useSelector } from "react-redux";
import LeftHome from "../../component/LeftHome";
import MessengerDown from "../../component/MessengerDown";
import MidHome from "../../component/MidHome";

import RightHome from "../../component/RightHome";

import { useQuery } from "@tanstack/react-query";

import { requestChat } from "../../service/service";
import { setChat, setUnRead, UnRead } from "../../slices/chatSlice";
import { selectUserInfo } from "../../selector/userSelector";
import { useEffect } from "react";

export type Chat={
     _id:string,
     user:string[],
     lastMessage:string,
     senderId:string,
     seen1:boolean,
     seen2:boolean,
     updatedAt:string
}

const Home = () => {
     const dispatch= useDispatch()
     const user = useSelector(selectUserInfo)
     console.log('currentUser:',user)
     const FetchChat = async()=>{
          try{

               const response = await requestChat.get(`/getChatOfUser?userId=${user._id}`)
               return response.data as Chat[]
          }catch(e){
               alert('Lỗi tải đoạn chat')
          }
     }
     
     const {data} = useQuery({
          queryKey:['chats'],
          queryFn:()=>FetchChat()
     })
     useEffect(()=>{
        
          if(data){
               dispatch(setChat(data))
               const init:UnRead={
                    numberUnRead:0,userId:[]
               }
               const numberUnRead = data.reduce((prev:UnRead,chat)=>{
                    
                    const isUser1 = chat.user[0] == user._id 
                    if(isUser1){
                         if(!chat.seen1){
                              const newPrev:UnRead={
                                   numberUnRead:prev.numberUnRead+1,
                                   userId:[...prev.userId,chat.senderId]
                              }
                              return newPrev
                         }
                         return prev
                    }else{
                         if(!chat.seen2){
                              return {numberUnRead:prev.numberUnRead+1,userId:[...prev.userId,chat.senderId]}
                         }
                         return prev
                    }
               },init)
               dispatch(setUnRead(numberUnRead))
          }
     },[data])

     
    return (
    <div className="home">
    
         <LeftHome  />
         <MidHome  />
         <RightHome currentUser={user} />
         
    </div>
      );
}
 
export default Home;