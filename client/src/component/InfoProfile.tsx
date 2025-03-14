import { useCallback, useState } from "react";
import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import HomeBio from '../assets/home-bio.png'
import Heart from '../assets/heart.png'
import GPS from '../assets/pin.png'
import HomeItem from "./HomeItem";
import ModalInfo from "./ModalInfo";



const InfoProfile = () => {
    const [isBio, setIsBio] = useState(false)
    const [isInfo, setIsInfo] = useState(false)
    const closeInfo = useCallback(()=>{
        setIsInfo(false)
    },[isInfo])
    const [bio,setBio] = useState("")

    return (

        <div className="infor-profile-container">
            {isInfo &&  <ModalInfo closeInfo={closeInfo} />}
            <p style={{ userSelect: 'none', color: 'white', fontSize: '3vh', fontWeight: 'bold' }}>Giới thiệu</p>
            {isBio ? (
                <>
                    <textarea onChange={(e)=>setBio(e.target.value)} style={{ height: '10vh', borderRadius: '1vh', border: 'none', backgroundColor: '#333334', color: 'white', outline: 'none', wordWrap: 'break-word', resize: 'none', padding: '1vh', userSelect: 'none' }} />
                    <div style={{display:'flex',marginTop:'1vh',flexDirection:'row',justifyContent:'flex-end'}}>

                        <FacebookButton onClick={()=>setIsBio(false)} style={{width:'15vh',height:'4vh',marginRight:'2vh',fontSize:'2vh'}} ButtonType={BUTTON_TYPE.cancel} isLoading={false} text="Hủy" />
                        <FacebookButton onClick={()=>{setIsBio(false)}}  style={{width:'15vh',height:'4vh',fontSize:'2vh'}} ButtonType={BUTTON_TYPE.basic} isLoading={false} text="Lưu" />
                    </div>

                </>
            ) : (

                <FacebookButton onClick={() => setIsBio(true)} ButtonType={BUTTON_TYPE.cancel} text="Thêm tiểu sử" isLoading={false} style={{ height: '4.5vh', fontSize: '2vh', width: '100%', marginTop: '2vh' }} />
            )}
            <HomeItem img={HomeBio} text={'Sống tại Hà nội'} styleText={{color:'white'}} styleContainer={{marginTop:'1vh'}} styleImg={{width:'3vh',height:'3vh'}} />
            <HomeItem img={GPS} text={'Đến từ Yên Bái'} styleText={{color:'white'}} styleContainer={{marginTop:'1vh'}} styleImg={{width:'3vh',height:'3vh'}} />
            <HomeItem img={Heart} text={'Độc thân'} styleText={{color:'white'}} styleContainer={{marginTop:'1vh'}} styleImg={{width:'3vh',height:'3vh'}} />
            <FacebookButton onClick={() => setIsInfo(true)} ButtonType={BUTTON_TYPE.cancel} text="Chỉnh sửa chi tiết" isLoading={false} style={{ height: '4.5vh', fontSize: '2vh', width: '100%', marginTop: '2vh' }} />

        </div>
    );
}

export default InfoProfile;