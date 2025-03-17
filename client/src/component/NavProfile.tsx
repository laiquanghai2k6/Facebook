import { useSelector } from 'react-redux';
import defaultImage from '../assets/defaul.jpg'
import { User } from '../slices/userSlice';
import { selectUserInfo } from '../selector/userSelector';


const NavProfile = () => {
    const user = useSelector(selectUserInfo)
    return (
        <div className="nav-profile">
            <div className='image-profile' >

                <div className="image-post">
                   {user.backgroundImage != "" && <img src={user.backgroundImage } style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> }
                </div>
            </div>
        </div>

    );
}

export default NavProfile;