import React from "react";
import UserImage from "./UserImage";
import moment from "moment/min/moment-with-locales";
import test from '../assets/test2.png'

interface MessengerTextLeftProps {
    text: string
    time: string
    image: string
}

const MessengerTextLeft: React.FC<MessengerTextLeftProps> = ({ text, time, image }) => {
    moment.locale("vi");
    const convertTime = moment(time).calendar()

    return (
        <div className="messenger-down-card-text">

            {text != "" && image == "" && 
            <div className="text-messenger-left">
                <UserImage height={'2rem'} width={'2rem'} style={{ alignSelf: 'flex-start' }} />
                <p style={{ textWrap: 'wrap', wordWrap: 'break-word', height: 'auto', marginLeft: '0.5rem', padding: '0.5rem', fontSize: '1rem', borderRadius: '1rem', maxWidth: '12.5rem', width: 'auto', backgroundColor: '#303030' }}>{text}</p>
            </div>
            }
            {image != "" && text == "" && 
            <>
               <UserImage height={'2rem'} width={'2rem'} style={{ alignSelf: 'flex-start' }} />
            <div className='image-message left'>
                <img src={image} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
            </div>
            </>
            
            }
            {
                image != "" && text != "" &&
                <>
                  <div className="text-messenger-left">
                <UserImage height={'2rem'} width={'2rem'} style={{ alignSelf: 'flex-start' }} />
                <p style={{ textWrap: 'wrap', wordWrap: 'break-word', height: 'auto', marginLeft: '0.5rem', padding: '0.5rem', fontSize: '1rem', borderRadius: '1rem', maxWidth: '12.5rem', width: 'auto', backgroundColor: '#303030' }}>{text}</p>
            </div>
             

                <div className="image-message left">
                    <img src={image} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                </div>
                </>
            }
            <div style={{ width: '95%', display: 'flex', flexDirection: 'row' }}>

                <p style={{ fontSize: '0.8rem', color: '#939699', marginLeft: '2.5rem' }}>{convertTime}</p>
            </div>
        </div>
    );
}

export default MessengerTextLeft;