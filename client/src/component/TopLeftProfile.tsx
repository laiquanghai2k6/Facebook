import ImageChain from "./ImageChain";
import UserImage from "./UserImage";
import FacebookIcon from '../assets/FacebookIcon.png'

const TopLeftProfile = () => {
    return (
        <div className='top-left-profile'>
            <UserImage height={'20vh'} width={'20vh'} />
            <div className='top-profile-right-image'>
                <p style={{ fontSize: '3.5vh', color: 'white', fontWeight: 'bold' }}>Lai Quang Hai</p>
                <p style={{ fontSize: '2vh', color: '#a2aeb8' }}>636 Người bạn</p>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1vh' }}>
                    <ImageChain img={FacebookIcon} />
                    <ImageChain img={FacebookIcon} />
                    <ImageChain img={FacebookIcon} />
                    <ImageChain img={FacebookIcon} />
                    <ImageChain img={FacebookIcon} />
                </div>
            </div>
        </div>
    );
}

export default TopLeftProfile;