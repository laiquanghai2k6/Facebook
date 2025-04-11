import { useDispatch } from "react-redux";
import BodyProfile from "../../component/BodyProfile";
import NavProfile from "../../component/NavProfile";
import { User } from "../../slices/userSlice";
import { navigateHome } from "../../slices/homeNavigateSlice";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { requestUser } from "../../service/service";
type ProfileProps = {
    user:User
}

const Profile = ({user}:ProfileProps) => {
    const dispatch = useDispatch()
    useEffect(()=>{

        dispatch(navigateHome(""))
    },[])

    const fetchFriend = async()=>{
        try{
            const response = await requestUser.get(`/getFriendOfUser?userId=${user._id}`)
            return response.data
        }catch(e){
            console.log(e)
            alert('Lỗi không tìm thấy bạn bè')
        }
    }
    const {data,isLoading } = useQuery({
        queryKey:['userFriend ',user._id],
        queryFn:()=>fetchFriend()
    })
    return ( 
        <div className="profile">
            <NavProfile user={user} />
            <BodyProfile friends={data} isLoading={isLoading} user={user}  />
        </div>
     );
}

export default Profile;