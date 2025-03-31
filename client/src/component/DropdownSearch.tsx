import { UserInfo } from "../slices/userSlice";
import UserImage from "./UserImage";
import Default from '../assets/default-image.png'
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
type DropdownSearchProps = {
    user: Array<UserInfo>
    isPending: boolean
}

const DropdownSearch = ({ user, isPending }: DropdownSearchProps) => {
    const navigate = useNavigate()
    return (

        <div className="dropdown-search-container">
            {isPending ? (
                <div style={{ marginTop: '1rem' }}>

                    <ClipLoader color="#444446" size={50} />
                </div>


            ) :(
                user.map((u, i) => {
                    return (
                        <div onClick={()=>navigate(`/profileOther`,{state:u})} key={i} className="left-home-items" style={{ width: '95%' }}>
                            <UserImage img={u.image ? u.image : Default} height={'2.5rem'} width={'2.5rem'} />
                            <p style={{ color: 'white' }} className="left-home-text">{`${u.name}`}</p>
                        </div>
                    )
                })
            )}
          



            {user.length == 0 && !isPending && (
                <div style={{marginTop:'1rem', color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Chưa tìm thấy người dùng
                </div>
            )}

        </div>
    );
}

export default DropdownSearch;