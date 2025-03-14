import FacebookIcon from '../assets/FacebookIcon.png'
import HomeItem from './HomeItem';
import Logout from '../assets/logout.png'
import UserImage from './UserImage';

const UserSettingCard = () => {
    return (
        <>
            <div className="user-setting-card">
                <UserImage height={'5vh'} width={'5vh'} />
                <p style={{ color: 'white', marginLeft: '2vh', fontSize: '2.5vh', fontWeight: 'bold' }}>Lại Quang Hải</p>

            </div>
            <div className='user-setting-card'>
                <HomeItem img={Logout} text='Đăng xuất' styleContainer={{alignItems:'center',justifyContent:'center'}} styleText={{color:'white'}} className='-sign-out' />
            </div>
        </>
    );
}

export default UserSettingCard;