import React, { MouseEventHandler, useEffect, useRef } from "react";
import Input from "./Input";
import MessengerCard from "./MessengerCard";

interface MessengerProps {
    closeMessenger: Function
}

const Messenger: React.FC<MessengerProps> = ({ closeMessenger }) => {
    const messengerRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const svgElement = (event.target as Element).closest("svg")
            if (messengerRef.current) {
              console.log(svgElement?.classList)
                if (!messengerRef.current.contains(event.target as Node) && (event.target as HTMLElement).className!="home-icon-right-mes"&&svgElement?.classList[0]!="home-icon-right-mes2") {
                    closeMessenger();

                }

            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeMessenger]);
    return (


        <div className="messenger" ref={messengerRef}>
            <p style={{ color: 'white', fontWeight: 'bold', fontSize: '3vh' }}>Đoạn chat</p>
            <Input className={'home-input'} type="text" style={{ width: '45vh', margin: '2vh 2.5vh 2vh 2.5vh', fontSize: '2vh' }} placeholder="Tìm kiếm trên messenger" />
            <div className="messenger-card-container">

                <MessengerCard />
                <MessengerCard />
                <MessengerCard />
                <MessengerCard />
                <MessengerCard />
                <MessengerCard />
                <MessengerCard />
                <MessengerCard />
                <MessengerCard />
                <MessengerCard />
                <MessengerCard />
                <MessengerCard />
                <MessengerCard />
                <MessengerCard />
                <MessengerCard />
                <MessengerCard />
                <MessengerCard />
                <MessengerCard />


            </div>
        </div>

    );
}

export default Messenger;