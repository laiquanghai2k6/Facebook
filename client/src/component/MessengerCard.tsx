import UserImage from "./UserImage";

const MessengerCard = () => {
    return (
        <div className="messenger-card">
            <UserImage height={'3.25rem'} width={'3.25rem'} />
            <div className="messenger-card-text">
                <p style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold' }}>bro</p>
                <div style={{display:'flex',flexDirection:'row'}}> 
                    <p style={{ color: '#b0b3b8', fontSize: '0.85rem'}}>fuck u</p>
                    <p style={{color:'#7d8083',marginLeft:'0.25rem',fontSize: '0.85rem'}}>‧30 phút</p>
                    <div style={{width:'1rem',height:'1rem',backgroundColor:'#5aa7ff',marginLeft:'auto',borderRadius:'50%'}}></div>
                </div>
                
            </div>
        </div>
    );
}

export default MessengerCard;