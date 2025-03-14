import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import UserImage from "./UserImage";

const NotificationCard = () => {
    return ( 
        <div className="notification-card">
        <UserImage height={'6vh'} width={'6vh'} minHeight={'6vh'} minWidth={'6vh'} />

        <div style={{ marginLeft: '1vh', display: 'flex', flexDirection: 'column', wordBreak: 'break-word', textWrap: 'wrap', wordWrap: 'break-word' }}>
            <p style={{ color: 'white', fontSize: '2vh', textWrap: 'wrap', wordBreak: 'break-word' }}>
                LQH đã gửi lời mời kết bạn
            </p>
            <p style={{ color: '#aaadb1', fontSize: '1.5vh'}}>
                3 giờ
            </p>
            <div style={{display:'flex',flexDirection:'row',width:'30vh',justifyContent:'space-around'}}>
                <FacebookButton style={{width:'12vh',height:'5vh',fontSize:'2vh',marginTop:'1vh'}}  ButtonType={BUTTON_TYPE.basic} text={'Chấp nhận'} isLoading={false} />
                <FacebookButton style={{width:'12vh',height:'5vh',fontSize:'2vh',marginTop:'1vh'}}  ButtonType={BUTTON_TYPE.cancel} text={'Xóa'} isLoading={false} />
            
            </div>
        </div>
    </div>
     );
}
 
export default NotificationCard;