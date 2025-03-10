import UserImage from "./UserImage";

const RightHome = () => {
    return ( 
        <div className="right-home">
            <p style={{marginBottom:'2vh'}}>Người liên hệ</p>
          <div className="left-home-items">
                <UserImage height={'5vh'} width={'5vh'} />
                <p className="left-home-text">Lại Quang Hải</p>
            </div>
            <div className="left-home-items">
                <UserImage height={'5vh'} width={'5vh'} />
                <p className="left-home-text">Lại Quang Hải</p>
            </div>
            <div className="left-home-items">
                <UserImage height={'5vh'} width={'5vh'} />
                <p className="left-home-text">Lại Quang Hải</p>
            </div>
            <div className="left-home-items">
                <UserImage height={'5vh'} width={'5vh'} />
                <p className="left-home-text">Lại Quang Hải</p>
            </div>
        </div>
     );
}
 
export default RightHome;