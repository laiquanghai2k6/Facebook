import React, { useCallback, useState } from "react";
import CloseButton from "./button/CloseButton";
import UserPost from "./UserPost";

import ImagePost from "./ImagePost";

import Hr from "./Hr";
import CommentList from "./CommentList";

import CommentInput from "./CommentInput";
import { PostType } from "../slices/postSlice";
import VideoPost from "./VideoPost";
import Spinner from "./Spinner";
import { requestComment } from "../service/service";

import InteractPostComment from "./InteractPostComment";
import CommentInputReply from "./CommentInputReply";
import { UserInfo } from "../slices/userSlice";
import { useQuery } from "@tanstack/react-query";
interface ModalCommentProps {
    setModalComment: Function
    post:PostType
}

const ModalComment: React.FC<ModalCommentProps> = ({ post,setModalComment }) => {
    const {image,text,video} = post
    const [loading,setLoading] = useState(false)
    const [parentId,setParentId] = useState("")
    const [commentReply,setCommentReply] = useState(false)
    const [userReply,setUserReply] = useState<UserInfo | null>(null)

    
    const fetchCommentPost = async ()=>{
        closeCommentReplyInput()
        try{
            const response = await requestComment.get(`/getCommentOfPost/${post.userId}/${post._id}`)
            return response.data
        }catch(e){
            console.log(e)
        }
    }
    const {data,isLoading} = useQuery({
        queryKey:['comments',post._id],
        queryFn:()=>fetchCommentPost()
    })
    const openCommentReplyInput = useCallback(()=>{
        setCommentReply(true)
    },[commentReply])
    const closeCommentReplyInput = useCallback(()=>{
        setCommentReply(false)
    },[commentReply])
    const setParentComment = useCallback((id:string)=>{
        setParentId(id)
    },[])
    const setLoad = useCallback((value:boolean)=>{
        setLoading(value)   
    },[])
 
    return (
        <div className="modal-comment-container">
            {(isLoading||loading)  && <Spinner />}
            <div className="modal-comment-box">
                <p style={{ position: 'absolute', top: '0', left: '40%', marginTop: '3vh', fontWeight: 'bold' }}>Bài viết của lqh</p>
                <Hr />
                <CloseButton onClick={() => setModalComment(false)} />
                <UserPost userId={post.userId} time={post.createdAt} />
                <div className="text-post-container">
                    <p className={`text-post-comment `}>{text}</p>

                </div>
                {video!="" && <VideoPost src={video} />}
                {image !="" && <ImagePost img={image}/>}
      
                
                <InteractPostComment lengthComment={data?.length} post={post} />
                <Hr />
                
                
                <CommentList setUserReply={setUserReply} setParentComment={setParentComment} openCommentReplyInput={openCommentReplyInput} currentComment={data} post={post} />
                {commentReply ?(
                  
                    <CommentInputReply  closeCommentReplyInput={closeCommentReplyInput} parentId={parentId} userReply={userReply} post={post} />
                ):(
                 
                    <CommentInput setLoading={setLoad}   post={post} />
                )}

            </div>
        </div>
    );
}

export default ModalComment;