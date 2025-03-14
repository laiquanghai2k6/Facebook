import React from "react";
import UserImage from "./UserImage";

interface MessengerTextLeftProps{
    text:string
}

const MessengerTextLeft:React.FC<MessengerTextLeftProps> = ({text}) => {
    return (
        <div className="messenger-down-card-text">
            <div className="text-messenger-left">
                <UserImage height={'4vh'} width={'4vh'} style={{ alignSelf: 'flex-start', justifySelf: 'flex-start' }} />
                <p style={{ textWrap: 'wrap', wordWrap: 'break-word', height: 'auto', marginLeft: '1vh', padding: '1vh', fontSize:'2vh',borderRadius: '2vh', width: '25vh', backgroundColor: '#303030' }}>{text}</p>
            </div>
        </div>
    );
}

export default MessengerTextLeft;