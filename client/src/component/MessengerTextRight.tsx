
interface MessengerTextRightProps{
    text:string
}


const MessengerTextRight:React.FC<MessengerTextRightProps> = ({text}) => {
    return (
        <div className="messenger-down-card-text">
            <div className="text-messenger-right">

                <p style={{ textWrap: 'wrap', wordWrap: 'break-word',fontSize:'2vh', height: 'auto', marginLeft: '1vh', padding: '1vh', borderRadius: '2vh', width: '25vh', background: 'linear-gradient(180deg, #6236FF, #4C00FF)' }}>{text}</p>
            </div>
        </div>
    );
}

export default MessengerTextRight;