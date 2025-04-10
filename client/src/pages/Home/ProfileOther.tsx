import BodyProfileOther from "../../component/BodyProfileOther";
import NavProfile from "../../component/NavProfile";
import { useNavigate, useSearchParams } from "react-router-dom";

import { requestUser } from "../../service/service";
import { useQuery } from "@tanstack/react-query";
import LoadingPost from "../../component/LoadingPost";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../selector/userSelector";
import { navigateHome } from "../../slices/homeNavigateSlice";



const ProfileOther = () => {
    const currentUser = useSelector(selectUserInfo)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const id = searchParams.get('userId')
    if (!id) {
        return (<>Không thấy</>)
    }
    if (id == currentUser._id) {
        dispatch(navigateHome('profile'))
        navigate('/profile')
    }
    const FetchUser = async (id: string) => {
        try {

            const resposne = await requestUser(`/getUserProfile/${id}`)
            console.log('res:', resposne.data)
            return resposne.data
        } catch (e) {
            alert('Không tìm thấy người dùng')
            console.log(e)
            return null
        }
    }
    const { data } = useQuery({
        queryKey: ['vc', id],
        queryFn: () => FetchUser(id),
        enabled: !!id
    })






    return (
        <div className="profile">

            {data != null ? (
                <>
                    <NavProfile user={data} type="other" />
                    <BodyProfileOther user={data} />
                </>
            ) : (
                <LoadingPost />
            )}

        </div>
    );
}

export default ProfileOther;