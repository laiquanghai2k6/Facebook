import UserImage from "./UserImage";
import Default from '../assets/default-image.png'
const MessengerSeen = () => {
    return ( 
        <div className="messenger-seen">
            <UserImage img={Default} style={{marginTop:'1rem',width:'1.3rem',height:'1.3rem'}} width={'0.5rem'} height={'0.5rem'}  />
        </div>
     );
}
 
export default MessengerSeen;