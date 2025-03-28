import FacebookIcon from '../assets/FacebookIcon.png'
import ImageChain from './ImageChain';
import UserImage from './UserImage';
import Camera from '../assets/camera-black.png'
import { CancelButton } from './button/button.styles';
import FacebookButton, { BUTTON_TYPE } from './button/FacebookButton';
import TopLeftProfile from './TopLeftProfile';
import TopProfileOther from './TopProfileOther';
import MidProfileOther from './MidProfileOther';
const BodyProfileOther = () => {
    return (
        <div className="body-profile">
        <TopProfileOther />
        <MidProfileOther />
        </div>
    );
}

export default BodyProfileOther;