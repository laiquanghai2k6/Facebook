import { User } from "../slices/userSlice";
import UserImage from "./UserImage";
type MidHomeProps = {
}

const RightHome:React.FC<MidHomeProps> = () => {
    return (
        <div className="right-home">
            <p style={{ marginBottom: '1rem' }}>Người liên hệ</p>
            <div className="left-home-items">
                <UserImage height={'2.5rem'} width={'2.5rem'} />
                <p className="left-home-text">Lại Quang Hải</p>
            </div>
            <div className="left-home-items">
                <UserImage height={'2.5rem'} width={'2.5rem'} />
                <p className="left-home-text">Lại Quang Hải</p>
            </div>
            <div className="left-home-items">
                <UserImage height={'2.5rem'} width={'2.5rem'} />
                <p className="left-home-text">Lại Quang Hải</p>
            </div>
            <div className="left-home-items">
                <UserImage height={'2.5rem'} width={'2.5rem'} />
                <p className="left-home-text">Lại Quang Hải</p>
            </div>
        </div>
    );
}

export default RightHome;