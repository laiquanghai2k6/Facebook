import UserImage from "./UserImage";

const MessengerCard = () => {
    return (
        <div className="messenger-card">
            <UserImage height={'6.5vh'} width={'6.5vh'} />
            <div className="messenger-card-text">
                <p style={{ color: 'white', fontSize: '2vh', fontWeight: 'bold' }}>bro</p>
                <div style={{display:'flex',flexDirection:'row'}}> 
                    <p style={{ color: '#b0b3b8', fontSize: '1.7vh'}}>fuck u</p>
                    <p style={{color:'#7d8083',marginLeft:'0.5vh',fontSize: '1.7vh'}}>‧30 phút</p>
                    <div style={{width:'2vh',height:'2vh',backgroundColor:'#5aa7ff',marginLeft:'auto',borderRadius:'50%'}}></div>
                </div>
                
            </div>
        </div>
    );
}

export default MessengerCard;