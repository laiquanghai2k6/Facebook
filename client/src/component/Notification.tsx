import React, { useEffect, useRef } from "react";

import NotificationCard from "./NotificationCard";

import { useDispatch} from "react-redux";
import {  notiType,  setNumberNoti } from "../slices/notiSlice";
import {  requestUser } from "../service/service";
import LoadingChat from "./LoadingChat";



interface NotificationCardProps{
    closeNotification:Function,
    currentUserId:string,
    data:notiType[],
    isLoading:Boolean
}

const Notification:React.FC<NotificationCardProps> = ({data,isLoading,closeNotification,currentUserId}) => {
    const notiRef = useRef<null |HTMLDivElement>(null)
    const dispatch = useDispatch()
    useEffect(()=>{

        const handlerClick = (event:MouseEvent)=>{
            const svgElement = (event.target as Element).closest('svg')
            if(notiRef.current){
                // console.log((event.target as HTMLElement).className)    
                if(!notiRef.current.contains(event.target as Node) && (event.target as HTMLElement).className!='home-icon-right-noti' && svgElement?.classList[0] !='home-icon-right-noti2' ){
                    closeNotification()
                }
            }
        }
        const update = {
            userId:currentUserId,
            type:'set',
            numberNoti:0
        }
        requestUser.put('/setNumberNoti',update)
        dispatch(setNumberNoti(0))
        document.addEventListener('mousedown',handlerClick)
        return ()=>{
            // dispatch(clearNoti())
            document.removeEventListener('mousedown',handlerClick)
        }
    })
    
    
   
    return (
        <div className="notification-container" ref={notiRef}>
            <p style={{ color: 'white', fontWeight: 'bold', fontSize: '3vh' }}>Thông báo</p>
            <div className="notification-card-container">
                {isLoading && <LoadingChat />}
                {data?.map((noti,i)=>{

                    return(
                        <NotificationCard key={i} noti={noti} />
                    )
                })}
                

           
            </div>
        </div>
        // <></>
    );
}

export default Notification;