import { useEffect } from "react";
import BodyProfileOther from "../../component/BodyProfileOther";
import NavProfile from "../../component/NavProfile";
import { useDispatch } from "react-redux";
import { navigateHome } from "../../slices/homeNavigateSlice";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { User, UserInfo } from "../../slices/userSlice";

import { requestUser } from "../../service/service";
import Spinner from "../../component/Spinner";
import { useQuery } from "@tanstack/react-query";
import LoadingPost from "../../component/LoadingPost";



const ProfileOther = () => {
    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()
    const id = searchParams.get('userId')
    console.log('id:',id)
    if (!id) {
        return (<>áddas</>)
    }
    const FetchUser = async (id: string) => {
        try {
            console.log('id in fetch:',id)
            const resposne = await requestUser(`/getUserProfile/${id}`)
            console.log('res:',resposne.data)
            return resposne.data
        } catch (e) {
            alert('Lỗi tải trang cá nhân')
            console.log(e)
            return null
        }
    }
   const {data,isLoading} = useQuery({
    queryKey:['vc',id],
    queryFn:()=>FetchUser(id),
    enabled:!!id
   }) 





   
  
    return (
        <div className="profile">
         
            {data!=null ? (

                <>
                    <NavProfile user={data} type="other" />

                    <BodyProfileOther user={data} />
                </>
            ):(
                <LoadingPost />
            )}
          
        </div>
    );
}

export default ProfileOther;