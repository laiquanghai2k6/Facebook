import HomeBio from '../assets/home-bio.png'
import Heart from '../assets/heart.png'
import GPS from '../assets/pin.png'
import HomeItem from "./HomeItem";
import Calendar from '../assets/calendar.png'
import Gender from '../assets/gender.png'
import { User } from "../slices/userSlice";
type InfoProfileOtherProp = {
    user:User
}

const InfoProfileOther = ({user}:InfoProfileOtherProp) => {
   
    return (

        <div className="infor-profile-container">
            <p style={{ userSelect: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>Giới thiệu</p>
            <p style={{ userSelect: 'none', color: 'white', fontSize: '1rem',alignSelf:'center',marginTop:'1rem',paddingBottom:'1rem' }}>{user.bio}</p>

            <HomeItem img={HomeBio} text={user.live} styleText={{color:'white'}} styleContainer={{marginTop:'0.5rem'}} styleImg={{width:'1.5rem',height:'1.5rem'}} />
            <HomeItem img={GPS} text={user.from} styleText={{color:'white'}} styleContainer={{marginTop:'0.5rem'}} styleImg={{width:'1.5rem',height:'1.5rem'}} />
            <HomeItem img={Heart} text={user.relationship} styleText={{color:'white'}} styleContainer={{marginTop:'0.5rem'}} styleImg={{width:'1.5rem',height:'1.5rem'}} />
            <HomeItem img={Calendar} text={user.birth} styleText={{color:'white'}} styleContainer={{marginTop:'0.5rem'}} styleImg={{width:'1.5rem',height:'1.5rem'}} />
            <HomeItem img={Gender} text={user.gender} styleText={{color:'white'}} styleContainer={{marginTop:'0.5rem'}} styleImg={{width:'1.5rem',height:'1.5rem'}} />

        </div>
    );
}

export default InfoProfileOther;