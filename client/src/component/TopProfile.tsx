import TopLeftProfile from "./TopLeftProfile";
import { User } from "../slices/userSlice";
import { Friend } from "./BodyProfile";


type TopProfileProps = {
    user:User,
    friends:Friend[],
    isLoading:boolean
}

const TopProfile = ({user,friends,isLoading}:TopProfileProps) => {


    

    
    return (
        <div className="top-profile-container">
           
            <div className='top-profile-direct' >
                <TopLeftProfile user={user} friends={friends} isLoadingFriend={isLoading} />
            </div>
     
          
        </div>
    );
}

export default TopProfile;