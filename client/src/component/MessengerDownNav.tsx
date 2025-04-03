import UserImage from "./UserImage";
import Close from '../assets/close.png'
import { ConvertDateOnline, UserQuickChat } from "./RightHome";
import Default from '../assets/default-image.png'
import { useDispatch } from "react-redux";
import { closeMessengerCard, UserOnline } from "../slices/messengerSlice";
type MessengerDownNavProps={
    card:UserQuickChat,
    userOnline:UserOnline
}
const MessengerDownNav = ({card,userOnline}:MessengerDownNavProps) => {
    const dispatch = useDispatch()
    const CloseMessengerCard = ()=>{
        dispatch(closeMessengerCard(card._id))
    }
    const isOnline = Object.keys(userOnline).includes(card._id)
  
    const now = Date.now()
    let lastOnline = "Unknown"
    
    if(card.lastOnline)
    lastOnline = ConvertDateOnline(now-card.lastOnline)
    return ( 
        <div className="nav-bar-card">
                <div style={{ display: 'flex', flexDirection: 'row' }}>

                    <UserImage img={card.image ? card.image : Default} height={'2rem'} width={'2rem'}  />
                    {isOnline && <div style={{ position: 'absolute', width: '0.85rem', height: '0.85rem', backgroundColor: '#3fbb46', borderRadius: '50%', left: '1.9rem', bottom: '0.1rem' }}></div>}
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '1rem' }}>
                        <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold' }}>{card.name}</p>
                        <p style={{ fontSize: '0.9rem', color: '#9b9ea3' }}>{isOnline ? "Đang hoạt động" : lastOnline}</p>
                    </div>
                </div>
                <div onClick={()=>CloseMessengerCard()}>
                    
                    <img className="close-button-small"
                        src={Close}
                    />
                </div>



            </div>
     );
}
 
export default MessengerDownNav;