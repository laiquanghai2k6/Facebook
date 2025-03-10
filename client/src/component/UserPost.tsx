import UserImage from "./UserImage";

const UserPost = () => {
    return ( 
        <div className="user-post-container">
            <UserImage width={'5vh'} height={'5vh'} />
            <div style={{flex:'1' ,flexDirection:'column',justifyContent:'space-between',marginLeft:'1vh'}}>
              
                    <p style={{fontSize:'2vh',fontWeight:'bold'}}>Lại Quang Hải</p>
                    <p style={{fontSize:'1.9vh',color:'#b0b3b8',fontWeight:'bold'}}>time</p>
            </div>
        </div>
     );
}
 
export default UserPost;