


const MessengerTextRight = ({text}:{text:string}) => {
    console.log('rerender sadasddasd')
    return (
        <div className="messenger-down-card-text">
            <div className="text-messenger-right">

                <p style={{ textWrap: 'wrap', wordWrap: 'break-word',fontSize:'1rem', height: 'auto', marginLeft: '0.5rem', padding: '0.5rem', borderRadius: '1rem', maxWidth: '12.5rem',width:'auto', background: 'linear-gradient(180deg, #6236FF, #4C00FF)' }}>{text}</p>
            </div>
        </div>
    );
}

export default MessengerTextRight;