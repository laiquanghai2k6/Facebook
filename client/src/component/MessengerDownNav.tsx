import UserImage from "./UserImage";
import Close from '../assets/close.png'
const MessengerDownNav = () => {
    return ( 
        <div className="nav-bar-card">
                <div style={{ display: 'flex', flexDirection: 'row' }}>

                    <UserImage height={'4vh'} width={'4vh'}  />
                    <div style={{ position: 'absolute', width: '1.7vh', height: '1.7vh', backgroundColor: '#3fbb46', borderRadius: '50%', left: '3.8vh', bottom: '0.2vh' }}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2vh' }}>
                        <p style={{ color: 'white', fontSize: '2vh', fontWeight: 'bold' }}>bro</p>
                        <p style={{ fontSize: '1.5vh', color: '#9b9ea3' }}>Đang hoạt động</p>
                    </div>
                </div>
                <div>
                    
                    <img className="close-button-small"
                        src={Close}
                    />
                </div>



            </div>
     );
}
 
export default MessengerDownNav;