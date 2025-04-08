
import TopProfileOther from './TopProfileOther';
import MidProfileOther from './MidProfileOther';
import { User } from '../slices/userSlice';
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