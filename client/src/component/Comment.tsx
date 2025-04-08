import UserImage from "./UserImage";
import Default from '../assets/default-image.png'
import { CommentType, ReplyComment } from "../slices/commentSlice";
import { UserInfo } from "../slices/userSlice";
import moment from "moment";

import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { navigateHome } from "../slices/homeNavigateSlice";

type CommentProps = {
    comment: CommentType | ReplyComment,
    openCommentReplyInput?: Function,
    setParentComment?: Function,
    setUserReply?: Function,
    dataUser: UserInfo,



}
export const ConvertDate = (timeDif: number, timePost: number) => {

    const seconds = Math.floor(timeDif / 1000)
    const minutes = Math.floor(timeDif / 60000)
    const hour = Math.floor(timeDif / 3600000)
    const days = Math.floor(timeDif / 86400000)
    if (seconds < 60) {
        return `${seconds} giây trước`
    } else if (minutes < 60) {
        return `${minutes} phút trước`
    } else if (hour < 24) {
        return `${hour} giờ trước`
    } else if (days < 4) {
        return `${days} ngày trước`
    } else return moment(timePost).format("DD-MM-YY HH:mm:ss")

}

const Comment = ({ setUserReply, dataUser, comment, setParentComment, openCommentReplyInput }: CommentProps) => {
    const { text, image, type, userId, video
        // , parentId 
    } = comment
    const timePost = new Date(comment.createdAt).getTime()
    const timeNow = Date.now()
    const timeDif = timeNow - timePost
    const formatDate = ConvertDate(timeDif, timePost)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // console.log('comment in Comment:',comment)
    const NavigateOtherProfile = () => {
        navigate(`/profileOther?userId=${userId}`)
        dispatch(navigateHome(""))
    }
    if (type == 'direct') {
        // console.log('in here')
        return (
            <>
                <div className={`comment`}>
                    <div>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <UserImage onClick={NavigateOtherProfile} img={dataUser?.image == "" ? Default : dataUser?.image}
                            style={{ zIndex: '500' }}
                            height={'2.5rem'} width={'2.5rem'} minWidth={'2.5rem'} minHeight={'2.5rem'} />
                        <div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', marginLeft: '0.5rem' }} >
                            <div className="comment-info-container">

                                <p onClick={NavigateOtherProfile} style={{ display: 'block', width: 'fit-content', fontSize: '1rem', fontWeight: 'bold' }}>{`${dataUser?.name}`}</p>
                                {text != "" && <p className="text-comment">{text}</p>}
                            </div>
                            {video != "" && (
                                <div className="wrap-image">
                                    <video image-comment controls src={video} />
                                </div>

                            )}
                            {image != "" && (
                                <div className="wrap-image">

                                    <img src={image} className="image-comment" />
                                </div>
                            )}
                        </div>
                    </div>


                </div>
                <div style={{ display: 'flex', flexDirection: 'row', color: '#aeb1b6', fontSize: '0.9rem', marginLeft: '4rem', marginBottom: '0.5rem' }}>
                    <p >{formatDate}</p>
                    <p className="text-comment-reply" onClick={() => {
                        if (setParentComment && setUserReply && openCommentReplyInput) {

                            setParentComment(comment._id)
                            setUserReply(dataUser)

                            openCommentReplyInput()
                        }
                    }}>Phản hồi</p>
                </div>

            </>
        );
    } else {
        return (
            <>
                {/* 4-1.25 rem */}
                <div className={`reply-comment`}>
                    <div style={{ height: '7rem', position: 'absolute', marginLeft: '1.25rem', top: '-6.5rem', width: '1px', marginTop: '1.25rem', border: '1px solid #46484b' }}>

                    </div>
                    <div style={{ height: '1px', width: '4rem', marginLeft: '1.25rem', marginTop: '1.25rem', border: '1px solid #46484b' }}>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <UserImage onClick={NavigateOtherProfile} img={dataUser?.image == "" ? Default : dataUser?.image} height={'2.5rem'} width={'2.5rem'} minWidth={'2.5rem'} minHeight={'2.5rem'} />
                        <div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', marginLeft: '0.5rem' }} >
                            <div className="comment-info-container">

                                <p onClick={NavigateOtherProfile} style={{ display: 'block', width: 'fit-content', fontSize: '1rem', fontWeight: 'bold' }}>{`${dataUser?.name}`}</p>
                                {text != "" && <p className="text-comment">{text}</p>}
                            </div>
                            {video != "" && <video controls src={video} style={{ height: '20rem', width: '30rem', objectFit: 'contain' }} />}
                            {image != "" && <img src={image} style={{ marginTop: '0.5rem', borderRadius: '1rem', width: '25rem', height: '25rem', objectFit: 'contain' }} />}
                        </div>
                    </div>


                </div>
                <div style={{ display: 'flex', flexDirection: 'row', color: '#aeb1b6', fontSize: '0.9rem', marginLeft: '9rem', marginBottom: '0.5rem' }}>
                    <p >{formatDate}</p>
                </div>
            </>
        )
    }
}

export default Comment;