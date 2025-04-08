
import moment from "moment/min/moment-with-locales";

const MessengerTextRight = ({ text, time, image }: { text: string, time: string, image: string }) => {
    moment.locale("vi");
    const convertTime = moment(time).calendar()
    return (
        <div className="messenger-down-card-text">
            {text != ""&&<  div className="text-messenger-right">

                <p style={{ textWrap: 'wrap', wordWrap: 'break-word', fontSize: '1rem', height: 'auto', marginLeft: '0.5rem', padding: '0.5rem', borderRadius: '1rem', maxWidth: '12.5rem', width: 'auto', background: 'linear-gradient(180deg, #6236FF, #4C00FF)' }}>{text}</p>
            </div>}
            {image != "" && <div className='image-message right'>

                <img src={image} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
            </div>
            }
            <div style={{ width: '95%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>

                <p style={{ fontSize: '0.8rem', color: '#939699' }}>{convertTime}</p>
            </div>
        </div>
    );
}

export default MessengerTextRight;