import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import TopLeftProfile from "./TopLeftProfile";
import Camera from '../assets/camera-black.png'

const TopProfileOther = () => {
    return (
        <div className="top-profile-container">
            <div className='top-profile-direct' >
                <TopLeftProfile />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FacebookButton className='btn1' style={{ padding: '1vh', marginTop: '3vh', fontSize: '2vh', width: '15vh', height: '5vh', marginRight: '2vh' }} isLoading={false} ButtonType={BUTTON_TYPE.basic} text='Thêm bạn bè' />
                    <FacebookButton className='btn2' style={{ padding: '1vh', marginTop: '3vh', fontSize: '2vh', width: '15vh', height: '5vh', marginRight: '2vh' }} isLoading={false} ButtonType={BUTTON_TYPE.basic} text='Nhắn tin' />
                </div>
            </div>
        </div>
    );
}

export default TopProfileOther;