import React, { useEffect, useState } from "react";
import CloseButton from "./button/CloseButton";
import Hr from "./Hr";
import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";

interface ModalInfoProps {
    closeInfo: Function
}

const ModalInfo: React.FC<ModalInfoProps> = ({ closeInfo }) => {
    const [live,setLive] = useState("")
    const [from,setFrom] = useState("")
    const [relationship,setRelationship] = useState("")

    return (
        <div className="modal-info-container">
            <div className="modal-info-box">
                <p style={{ fontSize: '3vh', color: 'white', position: 'absolute', top: '0', left: '35%', marginTop: '3vh', fontWeight: 'bold' }}>Chỉnh sửa chi tiết</p>
                <Hr />
                <CloseButton onClick={() => closeInfo()} />
                <div style={{ marginLeft:'2vh',display: 'flex', flexDirection: 'row', marginTop: '2vh' }}>
                    <p style={{color:'white',fontSize:'3vh'}}>Sống tại: </p>
                    <select name="" onChange={(e)=>{setLive(e.target.value)}} id="live" style={{marginLeft:'2vh',fontSize:'2vh'}}>
                        {vietnamProvinces.map((v,u)=>(
                            <option value={v} >{v}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginLeft:'2vh',display: 'flex', flexDirection: 'row', marginTop: '2vh' }}>
                    <p style={{color:'white',fontSize:'3vh'}}>Đến từ: </p>
                    <select onChange={(e)=>{setFrom(e.target.value)}} id="from" style={{marginLeft:'4vh',fontSize:'2vh'}}>
                        {vietnamProvinces.map((v,u)=>(
                            <option value={v}>{v}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginLeft:'2vh',display: 'flex', flexDirection: 'row', marginTop: '2vh' }}>
                    <p style={{color:'white',fontSize:'3vh'}}>Tình trạng quan hệ: </p>
                    <select name="" id="relationship" onChange={(e)=>{setRelationship(e.target.value)}} style={{marginLeft:'4vh',height:'4vh',fontSize:'2vh'}}>
                        {relationships.map((v,u)=>(
                            <option value={v}>{v}</option>
                        ))}
                    </select>
                </div>
                <FacebookButton ButtonType={BUTTON_TYPE.basic} text="Lưu" isLoading={false} style={{height:'4vh',width:'30vh',alignSelf:'center',marginTop:'auto',marginBottom:'2vh',fontSize:'2.5vh'}} />
            </div>
        </div>
    );
}


export default ModalInfo;

const relationships = [
    'Độc thân',
    'Hẹn hò',
    'Kết hôn'
]

const vietnamProvinces = [
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bạc Liêu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Cần Thơ",
    "Đà Nẵng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Nội",
    "Hà Tĩnh",
    "Hải Dương",
    "Hải Phòng",
    "Hậu Giang",
    "Hòa Bình",
    "Hồ Chí Minh",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái"
  ];
  

  