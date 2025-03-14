import { useState } from "react";
import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import HomeBio from '../assets/home-bio.png'
import Heart from '../assets/heart.png'
import GPS from '../assets/pin.png'
import HomeItem from "./HomeItem";



const InfoProfileOther = () => {
   
    return (

        <div className="infor-profile-container">
            <p style={{ userSelect: 'none', color: 'white', fontSize: '3vh', fontWeight: 'bold' }}>Giới thiệu</p>
            <p style={{ userSelect: 'none', color: 'white', fontSize: '2vh',alignSelf:'center',marginTop:'2vh',paddingBottom:'2vh' }}>facebook clon ..</p>

            <HomeItem img={HomeBio} text={'Sống tại Hà nội'} styleText={{color:'white'}} styleContainer={{marginTop:'1vh'}} styleImg={{width:'3vh',height:'3vh'}} />
            <HomeItem img={GPS} text={'Đến từ Yên Bái'} styleText={{color:'white'}} styleContainer={{marginTop:'1vh'}} styleImg={{width:'3vh',height:'3vh'}} />
            <HomeItem img={Heart} text={'Độc thân'} styleText={{color:'white'}} styleContainer={{marginTop:'1vh'}} styleImg={{width:'3vh',height:'3vh'}} />

        </div>
    );
}

export default InfoProfileOther;