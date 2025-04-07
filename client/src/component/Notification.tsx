import React, { useEffect, useRef } from "react";

import NotificationCard from "./NotificationCard";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { clearNoti, setNumberNoti } from "../slices/notiSlice";
import { requestUser } from "../service/service";



interface NotificationCardProps{
    closeNotification:Function,
    currentUserId:string
}

const Notification:React.FC<NotificationCardProps> = ({closeNotification,currentUserId}) => {
    const notiRef = useRef<null |HTMLDivElement>(null)
    const currentNoti = useSelector((state:RootState)=>state.notification.notification)
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
              
                {currentNoti?.map((noti,i)=>{

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