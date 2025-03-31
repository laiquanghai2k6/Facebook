import UserImage from "./UserImage";
import Default from '../assets/default-image.png'
import { CommentType } from "../slices/commentSlice";
import { useEffect, useState } from "react";
import { UserInfo } from "../slices/userSlice";
import { requestUser } from "../service/service";
import moment from "moment";

import "react-lazy-load-image-component/src/effects/blur.css";
import Spinner from "./Spinner";
import SkeletonComment from "./LoadingComment";

type CommentProps = {
    comment: CommentType,
    openCommentReplyInput: Function,
    setParentComment: Function,
    setUserReply: Function,
    dataUser:UserInfo


}
export const ConvertDate = (timeDif: number) => {

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
    } else return moment(timeDif).format("DD-MM-YY HH:mm:ss")

}

const Comment = ({ setUserReply,dataUser, comment, setParentComment, openCommentReplyInput }: CommentProps) => {
    const { text, image, type, userId, video } = comment
    const timePost = new Date(comment.createdAt).getTime()
    const timeNow = Date.now()
    const timeDif = timeNow - timePost
    const formatDate = ConvertDate(timeDif)
    return (
        <>
    
     
                 
                    <div className={`comment`}>
                        <div>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <UserImage img={dataUser?.image == "" ? Default : dataUser?.image} height={'5vh'} width={'5vh'} minWidth={'5vh'} minHeight={'5vh'} />
                            <div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', marginLeft: '1vh' }} >
                                <div className="comment-info-container">

                                    <p style={{ display: 'block', width: 'fit-content', fontSize: '2vh', fontWeight: 'bold' }}>{`${dataUser?.name}`}</p>
                                    {text != "" && <p className="text-comment">{text}</p>}
                                </div>
                                {video != "" && <video controls src={video} style={{ height: '40vh', width: '60vh', objectFit: 'contain' }} />}
                                {image != "" && <img src={image} style={{ marginTop: '1vh', borderRadius: '2vh', width: '50vh', height: '50vh', objectFit: 'contain' }} />}
                            </div>
                        </div>


                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', color: '#aeb1b6', fontSize: '1.8vh', marginLeft: '8vh', marginBottom: '1vh' }}>
                        <p >{formatDate}</p>
                        <p className="text-comment-reply" onClick={() => {
                            setParentComment(comment._id)
                            openCommentReplyInput()
                        }}>Phản hồi</p>
                    </div>
                 
                </>
    );
}

export default Comment;