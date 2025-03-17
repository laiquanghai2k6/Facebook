
import TopProfile from './TopProfile';
import MidProfile from './MidProfile';
import { User } from '../slices/userSlice';
type BodyProfileProps = {
 
}

const BodyProfile = () => {
    return (
        <div className="body-profile">
            <TopProfile/>
            <MidProfile />

        </div>
    );
}

export default BodyProfile;