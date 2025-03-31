import { useDispatch, useSelector } from "react-redux";
import LeftHome from "../../component/LeftHome";
import MessengerDown from "../../component/MessengerDown";
import MidHome from "../../component/MidHome";

import RightHome from "../../component/RightHome";

import { useQuery } from "@tanstack/react-query";

import { requestChat } from "../../service/service";
import { setChat } from "../../slices/chatSlice";
import { selectUserInfo } from "../../selector/userSelector";
import { useEffect } from "react";

export type Chat={
     _id:string,
     user:string[],
     lastMessage:string,
     senderId:string,
     isSeen:boolean,
     createdAt:string
}

const Home = () => {
     const dispatch= useDispatch()
     const user = useSelector(selectUserInfo)
     const FetchChat = async()=>{
          try{

               const response = await requestChat.get(`/getChatOfUser?userId=${user._id}`)
               return response.data as Chat[]
          }catch(e){
               alert('Lỗi tải đoạn chat')
          }
     }
     const {data,isLoading} = useQuery({
          queryKey:['chats'],
          queryFn:()=>FetchChat()
     })
     useEffect(()=>{
        
          if(data){
                dispatch(setChat(data)) 
          }
     },[data])
     
     
    return (
    <div className="home">
    
         <LeftHome  />
         <MidHome  />
         <RightHome  />
         <MessengerDown />
         
    </div>
      );
}
 
export default Home;