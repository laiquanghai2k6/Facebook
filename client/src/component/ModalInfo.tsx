import React, { useCallback, useState } from "react";
import CloseButton from "./button/CloseButton";
import Hr from "./Hr";
import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, selectUserProfileInfo } from "../selector/userSelector";
import Select from "./Select";
import Input from "./Input";
import { requestUser } from "../service/service";
import { setUserLive } from "../slices/userSlice";
import Spinner from "./Spinner";



interface ModalInfoProps {
    closeInfo: Function
}
type birth = {
    day: string,
    month: string,
    year: string,

}


const ModalInfo: React.FC<ModalInfoProps> = ({ closeInfo }) => {
    const profileInfo = useSelector(selectUserProfileInfo)    
    const [loading,isLoading] = useState(false)

    const user = useSelector(selectUserInfo)
    const splitDate = profileInfo.birth.split('/')
    const dispatch = useDispatch()
    const [live, setLive] = useState(profileInfo.live)
    const [from, setFrom] = useState(profileInfo.from)
    const [relationship, setRelationship] = useState(profileInfo.relationship)
    const [birth, setBirth] = useState<birth>({
        day: splitDate[0],
        month: splitDate[1],
        year: splitDate[2]
    })
    const [gender, setGender] = useState(profileInfo.gender)
    const changeRegisterInfo = useCallback((type: string, value: string) => {
        switch (type) {
            case 'day':
                setBirth((prev) => ({ ...prev, day: value }))
                break;
            case 'month':
                setBirth((prev) => ({ ...prev, month: value }))
                break;
            case 'year':
                setBirth((prev) => ({ ...prev, year: value }))
                break;
            case 'gender':
                setGender(value)
                break;
            default:
                break;
        }
    }, [])
    const setInfoProfile = async () => {
        const data = {
            userId: user._id,
            live,
            from,
            relationship,
            birth: `${birth.day}/${birth.month}/${birth.year}`,
            gender
        }
        isLoading(true)
        
        await requestUser.post('/setUserProfileInfo', data)
        console.log('done')
        dispatch(setUserLive({
            live,
            from,
            relationship,
            birth: `${birth.day}/${birth.month}/${birth.year}`,
            gender

        }))
        isLoading(false)
        
        closeInfo()
    }

    const relationships = [
        profileInfo.relationship,
        'Độc thân',
        'Hẹn hò',
        'Kết hôn'
    ]

    const vietnamProvincesFrom = [
        profileInfo.from,
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
    const vietnamProvincesLive = [
        profileInfo.live,
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

    return (
        <div className="modal-info-container">
            {loading && <Spinner />}
            <div className="modal-info-box">
                <p style={{ fontSize: '3vh', color: 'white', position: 'absolute', top: '0', left: '35%', marginTop: '3vh', fontWeight: 'bold' }}>Chỉnh sửa chi tiết</p>
                <Hr />
                <CloseButton onClick={() => closeInfo()} />
                <div style={{ marginLeft: '2vh', display: 'flex', flexDirection: 'row', marginTop: '2vh' }}>
                    <p style={{ color: 'white', fontSize: '3vh' }}>Sống tại: </p>
                    <select name="" onChange={(e) => { setLive(e.target.value) }} id="live" style={{ marginLeft: '2vh', fontSize: '2vh' }}>
                        {vietnamProvincesLive.map((v, i) => (
                            <option key={i} value={v} >{v}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginLeft: '2vh', display: 'flex', flexDirection: 'row', marginTop: '2vh' }}>
                    <p style={{ color: 'white', fontSize: '3vh' }}>Đến từ: </p>
                    <select onChange={(e) => { setFrom(e.target.value) }} id="from" style={{ marginLeft: '4vh', fontSize: '2vh' }}>
                        {vietnamProvincesFrom.map((v, i) => (
                            <option key={i} value={v}>{v}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginLeft: '2vh', display: 'flex', flexDirection: 'row', marginTop: '2vh' }}>
                    <p style={{ color: 'white', fontSize: '3vh' }}>Tình trạng quan hệ: </p>
                    <select name="" id="relationship" onChange={(e) => { setRelationship(e.target.value) }} style={{ marginLeft: '4vh', height: '4vh', fontSize: '2vh' }}>
                        {relationships.map((v, i) => (
                            <option key={i} value={v}>{v}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginLeft: '2vh', display: 'flex', marginTop: '2vh' }}>

                    <p style={{ color: 'white', fontSize: '3vh' }}>Ngày sinh:</p>
                </div>
                <div className="date-container" style={{ marginLeft: '2vh' }}>

                    <Select value={birth.day} onHandler={changeRegisterInfo} type="day" length={31} start={31} />
                    <Select month={true} value={birth.month} type="month" onHandler={changeRegisterInfo} length={130} start={2025} />
                    <Select value={birth.year} onHandler={changeRegisterInfo} type="year" length={130} start={2025} />
                </div>
                <div style={{ marginLeft: '2vh', display: 'flex', marginTop: '2vh' }}>

                    <p style={{ color: 'white', fontSize: '3vh' }}>
                        Giới tính:
                    </p>
                </div>
                <div className="gender-container" style={{ marginLeft: '2vh' }}>

                    <label style={{ color: 'white', fontSize: '2vh' }} className="label-gender-register">Nữ<Input checked={gender=="Nữ"} value='Nữ' onChange={(e) => changeRegisterInfo('gender', e.target.value)} className="register-gender" type="radio" name="gender" style={{ width: '2vh', margin: '0 1vh' }} /></label>


                    <label style={{ color: 'white', fontSize: '2vh' }} className="label-gender-register">Nam<Input checked={gender=="Nam"} value='Nam' onChange={(e) => changeRegisterInfo('gender', e.target.value)} className="register-gender" type="radio" name="gender" style={{ width: '2vh', margin: '0 1vh' }} /></label>


                    <label style={{ color: 'white', fontSize: '2vh' }} className="label-gender-register">Tùy chỉnh<Input checked={gender=="Tùy chọn"} value='Tùy chọn' onChange={(e) => changeRegisterInfo('gender', e.target.value)} className="register-gender" type="radio" name="gender" style={{ width: '2vh', margin: '0 1vh' }} /></label>



                </div>
                <FacebookButton onClick={setInfoProfile} ButtonType={BUTTON_TYPE.basic} text="Lưu" isLoading={false} style={{ height: '4vh', width: '30vh', alignSelf: 'center', marginTop: '2vh', marginBottom: '2vh', fontSize: '2.5vh' }} />
            </div>
        </div>
    );
}


export default ModalInfo;



