import { useState } from "react";
import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import HomeBio from '../assets/home-bio.png'
import Heart from '../assets/heart.png'
import GPS from '../assets/pin.png'
import HomeItem from "./HomeItem";
import Calendar from '../assets/calendar.png'
import Gender from '../assets/gender.png'


const InfoProfileOther = () => {
   
    return (

        <div className="infor-profile-container">
            <p style={{ userSelect: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>Giới thiệu</p>
            <p style={{ userSelect: 'none', color: 'white', fontSize: '1rem',alignSelf:'center',marginTop:'1rem',paddingBottom:'1rem' }}>facebook clon ..</p>

            <HomeItem img={HomeBio} text={'Sống tại Hà nội'} styleText={{color:'white'}} styleContainer={{marginTop:'0.5rem'}} styleImg={{width:'1.5rem',height:'1.5rem'}} />
            <HomeItem img={GPS} text={'Đến từ Yên Bái'} styleText={{color:'white'}} styleContainer={{marginTop:'0.5rem'}} styleImg={{width:'1.5rem',height:'1.5rem'}} />
            <HomeItem img={Heart} text={'Độc thân'} styleText={{color:'white'}} styleContainer={{marginTop:'0.5rem'}} styleImg={{width:'1.5rem',height:'1.5rem'}} />
            <HomeItem img={Calendar} text={"22/3/2222"} styleText={{color:'white'}} styleContainer={{marginTop:'0.5rem'}} styleImg={{width:'1.5rem',height:'1.5rem'}} />
            <HomeItem img={Gender} text={"Nam"} styleText={{color:'white'}} styleContainer={{marginTop:'0.5rem'}} styleImg={{width:'1.5rem',height:'1.5rem'}} />

        </div>
    );
}

export default InfoProfileOther;