import TopLeftProfile from "./TopLeftProfile";
import { User } from "../slices/userSlice";


type TopProfileProps = {
    user:User
}

const TopProfile = ({user}:TopProfileProps) => {


    

    
    return (
        <div className="top-profile-container">
           
            <div className='top-profile-direct' >
                <TopLeftProfile user={user} />
            </div>
     
          
        </div>
    );
}

export default TopProfile;