import FacebookIcon from '../assets/FacebookIcon.png'
import ImageChain from './ImageChain';
import UserImage from './UserImage';
import Camera from '../assets/camera-black.png'
import { CancelButton } from './button/button.styles';
import FacebookButton, { BUTTON_TYPE } from './button/FacebookButton';
import TopLeftProfile from './TopLeftProfile';
import TopProfileOther from './TopProfileOther';
import MidProfileOther from './MidProfileOther';
import { User, UserInfo } from '../slices/userSlice';
type BodyProfileOtherProp ={
    user:User
}
const BodyProfileOther = ({user}:BodyProfileOtherProp) => {
    return (
        <div className="body-profile">
        <TopProfileOther user={user}/>
        <MidProfileOther user={user} />
        </div>
    );
}

export default BodyProfileOther;