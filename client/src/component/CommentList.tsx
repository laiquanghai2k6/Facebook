import { useCallback, useEffect, useState } from "react";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

import { PostType } from "../slices/postSlice";
import { requestComment, requestUser } from "../service/service";
import { CommentType } from "../slices/commentSlice";
import Spinner from "./Spinner";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../store/store";
import SkeletonComment from "./LoadingComment";
import { useQuery } from "@tanstack/react-query";
import { UserInfo } from "../slices/userSlice";
import { selectUserInfo } from "../selector/userSelector";
type CommentListProps = {
    post: PostType,
    currentComment: Array<CommentType> | undefined
    openCommentReplyInput: Function
    setParentComment: Function
    setUserReply: Function,
    dataUser:UserInfo[]

}

const CommentList = ({ post, setUserReply, dataUser,currentComment, setParentComment, openCommentReplyInput }: CommentListProps) => {


    const commentRedux = useSelector((state: RootState) => state.comment.comments)
    const replyRedux = useSelector((state:RootState)=>state.comment.replyComment)
    const currentUser = useSelector(selectUserInfo)
    const me = useSelector(selectUserInfo)
    const replyComment = currentComment?.filter((cmt)=>cmt.type == 'reply')
    console.log('currentComment',commentRedux)
    console.log('replyComment',replyRedux)


    return (
        <div className="comment-list" key={`${me._id}cv cwa`}>
     
                <div key={`${me._id}`}>
                    {commentRedux.map((comment, i) => {
                           if(comment.postId == post._id){
                                if(comment.children){
                                    return (
                                        <div key={i}>
                                            <Comment   dataUser={currentUser} setUserReply={setUserReply} setParentComment={setParentComment} openCommentReplyInput={openCommentReplyInput} key={`${comment._id}daabssa`} comment={comment} />
                                            {replyRedux.map((reply)=>{
                                                if(reply.parentId == comment._id)
                                                return(
                                                    <Comment   dataUser={me} key={`${reply._id}kdssqa`} comment={reply} />
                                            
                                                )
                                            })}
                                        </div>
                                   )
                                }else{
                                    return (
                                        <Comment  dataUser={currentUser} setUserReply={setUserReply} setParentComment={setParentComment} openCommentReplyInput={openCommentReplyInput} key={`${comment._id}dsbfczvbva`} comment={comment} />
                                    )
                                }
                           }
                        }
                    )}
                    {currentComment?.map((comment, i) => {
                        if (dataUser && dataUser[i] && comment.type!='reply')
                        {
                           
                            if(comment.children){
                                
                                const replyCommentThisParent = replyComment?.filter((rep)=>rep.parentId == comment._id)
                                return (
                                    <div key={`${i}dsv`}>
                                    <Comment  dataUser={dataUser[i]} setUserReply={setUserReply} setParentComment={setParentComment} openCommentReplyInput={openCommentReplyInput} key={`${comment._id}dsakkvfs`} comment={comment} />
                                    {replyRedux.map((reply)=>{
                                                if(reply.parentId == comment._id)
                                                return(
                                                    <Comment   dataUser={me} key={`${reply._id}dsva`} comment={reply} />
                                            
                                                )
                                    })}
                                    {replyCommentThisParent?.map((reply)=>{
                                        const indexUser = dataUser.findIndex((data)=>data._id == reply.userId)
                                        return(
                                            <Comment dataUser={dataUser[indexUser]} key={`${reply._id}dsa`} comment={reply} />
                                        )

                                    })}
                                    </div>
    
                                )
                            }else{
                                return(
                                    
                                    <Comment   dataUser={dataUser[i]} setUserReply={setUserReply} setParentComment={setParentComment} openCommentReplyInput={openCommentReplyInput} key={i} comment={comment} />
                                )
                                
                            }

                        }
                    }
                    )}
                </div>
          






            {/* <CommentReply />
             */}


        </div>
    );
}

export default CommentList;