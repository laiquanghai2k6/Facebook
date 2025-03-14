import UserImage from "./UserImage";
import FacebookIcon from '../assets/FacebookIcon.png'
const Comment = () => {
    let text = 'DFDSFDSFDSFSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSWSSSSSSSSSDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD'
    return (
        <>
            <div className="comment">
                <UserImage height={'5vh'} width={'5vh'} />
                <p className="text-comment">{text}</p>

            </div>
            <div style={{ display: 'flex', flexDirection: 'row', color: '#aeb1b6', fontSize: '1.8vh', marginLeft: '8vh', marginBottom: '1vh' }}>
                <p >2 giờ</p>
                <p className="text-comment-reply" >Phản hồi</p>
            </div>

        </>
    );
}

export default Comment;