import UserImage from "./UserImage";

let text = 'DFDSFDSFDSFSSDFDSFDSFDSFDFDSFDSFDSFDFDSFDSFDSFDFDSFDSFDSFDFDSFDSFDSFDFDSFDSFDSF'


const CommentReply = () => {
    return (
        <>
            <div className="reply-comment">
                <UserImage height={'3vh'} width={'5vh'} className="user-image-comment"/>
                <p className="text-comment" style={{marginLeft:'1vh'}}>{text}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', color: '#aeb1b6', fontSize: '1.8vh', marginLeft: '16vh', marginBottom: '1vh' }}>
                <p >2 giờ</p>
                <p className="text-comment-reply" >Phản hồi</p>
            </div>
        </>
    );
}

export default CommentReply