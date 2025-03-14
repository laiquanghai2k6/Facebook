import React, { useEffect, useRef } from "react";
import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import NotificationCard from "./NotificationCard";
import UserImage from "./UserImage";

interface NotificationCardProps{
    closeNotification:Function
}

const Notification:React.FC<NotificationCardProps> = ({closeNotification}) => {
    const notiRef = useRef<null |HTMLDivElement>(null)
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

        document.addEventListener('mousedown',handlerClick)
        return ()=>{
            document.removeEventListener('mousedown',handlerClick)
        }
    })
    return (
        <div className="notification-container" ref={notiRef}>
            <p style={{ color: 'white', fontWeight: 'bold', fontSize: '3vh' }}>Thông báo</p>
            <div className="notification-card-container">
                <NotificationCard />
                <NotificationCard />

           
            </div>
        </div>
        // <></>
    );
}

export default Notification;