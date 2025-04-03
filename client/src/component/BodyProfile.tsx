
import TopProfile from './TopProfile';
import MidProfile from './MidProfile';
import { User } from '../slices/userSlice';
type BodyProfileProps = {
    user:User
}

const BodyProfile = ({user}:BodyProfileProps) => {
    return (
        <div className="body-profile">
            <TopProfile user={user}/>
            <MidProfile user={user} />

        </div>
    );
}

export default BodyProfile;