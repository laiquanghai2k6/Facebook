import React from "react";
import UserImage from "./UserImage";

interface MessengerTextLeftProps{
    text:string
}

const MessengerTextLeft:React.FC<MessengerTextLeftProps> = ({text}) => {
    return (
        <div className="messenger-down-card-text">
            <div className="text-messenger-left">
                <UserImage height={'2rem'} width={'2rem'} style={{ alignSelf: 'flex-start', justifySelf: 'flex-start' }} />
                <p style={{ textWrap: 'wrap', wordWrap: 'break-word', height: 'auto', marginLeft: '0.5rem', padding: '0.5rem', fontSize:'1rem',borderRadius: '1rem', maxWidth: '12.5rem',width:'auto', backgroundColor: '#303030' }}>{text}</p>
            </div>
        </div>
    );
}

export default MessengerTextLeft;