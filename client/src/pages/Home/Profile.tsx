import BodyProfile from "../../component/BodyProfile";
import NavProfile from "../../component/NavProfile";

const Profile = () => {
    return ( 
        <div className="profile">
            <NavProfile />
            
            <BodyProfile />
        </div>
     );
}

export default Profile;