
import TopProfile from './TopProfile';
import MidProfile from './MidProfile';
import { User } from '../slices/userSlice';
export type Friend = {
    name:string,
    image:string,
    _id:string
}
type BodyProfileProps = {
    user:User,
    friends:Friend[],
    isLoading:boolean
}

const BodyProfile = ({user,friends,isLoading}:BodyProfileProps) => {
    return (
        <div className="body-profile">
            <TopProfile user={user} friends={friends} isLoading={isLoading}/>
            <MidProfile user={user} friends={friends} isLoading={isLoading} />

        </div>
    );
}

export default BodyProfile;