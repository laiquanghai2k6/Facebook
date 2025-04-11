
import TopProfileOther from './TopProfileOther';
import MidProfileOther from './MidProfileOther';
import { User } from '../slices/userSlice';
import { Friend } from './BodyProfile';
type BodyProfileOtherProp ={
    user:User,
       friends:Friend[],
        isLoading:boolean
}
const BodyProfileOther = ({user,friends,isLoading}:BodyProfileOtherProp) => {
    return (
        <div className="body-profile">
        <TopProfileOther user={user} friends={friends} isLoadingFriend={isLoading}/>
        <MidProfileOther user={user}  friends={friends} isLoadingFriend={isLoading}/>
        </div>
    );
}

export default BodyProfileOther;