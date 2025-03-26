import { useEffect, useState } from "react";
import UserImage from "./UserImage";
import { requestUser } from "../service/service";

import Default from '../assets/default-image.png'
import moment from "moment";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner";
import { useQuery } from "@tanstack/react-query";

type UserPostProps = {
    userId:string,
    time:string
}



const ConvertDate = (timeDif:number,timePost:number)=>{

    const seconds = Math.floor(timeDif/1000)
    const minutes = Math.floor(timeDif/60000)
    const hour = Math.floor(timeDif/3600000)

    const days = Math.floor(timeDif/86400000)
    // console.log(days)
    if(seconds < 60){
        return `${seconds} giây trước`
    }else if(minutes < 60){
        return `${minutes} phút trước`
    }else if(hour < 24){
        return `${hour} giờ trước`
    }else if(days < 4){
        return `${days} ngày trước`
    }else return moment(timePost).format("DD-MM-YY HH:mm:ss")

}
const UserPost = ({userId,time}:UserPostProps ) => {

    const timePost = new Date(time).getTime();

    const timeNow = new Date(Date.now())
    const timeDif = timeNow.getTime()-(timePost)
    const formatDate = ConvertDate(timeDif,timePost)

   
    const fetchOwnerPost = async ()=>{
        try{
            const response = await requestUser.get(`/getUser/${userId}`)
         
            return response.data
        }catch(e){
            alert("Lỗi tải bài viết người dùng")
            console.log(e)
        }
    }

        const {data,isLoading} = useQuery({
            queryKey:['userId',userId],
            queryFn:()=>fetchOwnerPost(),
        })


    return ( 
        <div className="user-post-container">
            {isLoading && <Spinner />}
            <UserImage img={data?.image == "" ? Default : data?.image} width={'2.5rem'} height={'2.5rem'} />
            <div style={{flex:'1' ,flexDirection:'column',justifyContent:'space-between',marginLeft:'1vh'}}>
              
                    <p style={{fontSize:'1rem',fontWeight:'bold'}}>{`${data?.firstName} ${data?.lastName}`}</p>
                    <p style={{fontSize:'0.9rem',color:'#b0b3b8',fontWeight:'bold'}}>{formatDate}</p>
            </div>
        </div>
     );
}
 
export default UserPost;