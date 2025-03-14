
import MessengerTextLeft from "./MessengerTextLeft";
import MessengerTextRight from "./MessengerTextRight";
import MessengerSeen from "./MessengerSeen";
import MessengerDownInput from "./MessengerDownInput";
import MessengerDownNav from "./MessengerDownNav";
import React from "react";
interface MessengerDownCard{
    keys:number
}
const MessengerDownCard:React.FC<MessengerDownCard> = ({keys}) => {
    
    let text='sadddddddddddddddddsadddddddddddddddddsadddddddddddddddddsaddddddddddddddddd'
    return (
        <div className="messenger-down-card">
            <MessengerDownNav />
            <div className="messenger-down-card-text-container">
                 <MessengerTextLeft text={text} /> 
                 <MessengerTextRight text={text} />
                <MessengerSeen />
                <MessengerTextRight text={text} />             
                <MessengerTextRight text={text} /> 
            </div>
            <MessengerDownInput keys={keys} />

        </div>
    );
}

export default MessengerDownCard;