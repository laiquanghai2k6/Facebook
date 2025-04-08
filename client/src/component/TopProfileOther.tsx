import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import TopLeftProfile from "./TopLeftProfile";
import { UserInfo } from "../slices/userSlice";
type TopProfileOtherProp={
    user:UserInfo
}
const TopProfileOther = ({user}:TopProfileOtherProp) => {
    return (
        <div className="top-profile-container">
            <div className='top-profile-direct' >
                <TopLeftProfile user={user} type="other" />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FacebookButton className='btn1' style={{ padding: '0.5ren', marginTop: '1.5rem', fontSize: '1rem', width: '7.5rem', height: '2.5rem', marginRight: '1rem' }} isLoading={false} ButtonType={BUTTON_TYPE.basic} text='Thêm bạn bè' />
                    <FacebookButton className='btn2' style={{ padding: '0.5ren', marginTop: '1.5rem', fontSize: '1rem', width: '7.5rem', height: '2.5rem', marginRight: '1rem' }} isLoading={false} ButtonType={BUTTON_TYPE.basic} text='Nhắn tin' />
                </div>
            </div>
        </div>
    );
}

export default TopProfileOther;