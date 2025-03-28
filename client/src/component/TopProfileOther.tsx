import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import TopLeftProfile from "./TopLeftProfile";
import Camera from '../assets/camera-black.png'

const TopProfileOther = () => {
    return (
        <div className="top-profile-container">
            <div className='top-profile-direct' >
                <TopLeftProfile type="other" />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FacebookButton className='btn1' style={{ padding: '0.5ren', marginTop: '1.5rem', fontSize: '1rem', width: '7.5rem', height: '2.5rem', marginRight: '1rem' }} isLoading={false} ButtonType={BUTTON_TYPE.basic} text='Thêm bạn bè' />
                    <FacebookButton className='btn2' style={{ padding: '0.5ren', marginTop: '1.5rem', fontSize: '1rem', width: '7.5rem', height: '2.5rem', marginRight: '1rem' }} isLoading={false} ButtonType={BUTTON_TYPE.basic} text='Nhắn tin' />
                </div>
            </div>
        </div>
    );
}

export default TopProfileOther;