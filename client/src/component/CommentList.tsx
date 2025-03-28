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
    currentComment: Array<CommentType> | null
    openCommentReplyInput: Function
    setParentComment: Function
    setUserReply: Function,

}

const CommentList = ({ post, setUserReply, currentComment, setParentComment, openCommentReplyInput }: CommentListProps) => {


    const commentRedux = useSelector((state: RootState) => state.comment.comments,shallowEqual)
    const currentUser = useSelector(selectUserInfo)
    const fetchUserComment = async () => {
        try {
            if (currentComment) {
                const users = await Promise.all(
                    currentComment.map(async (comment) => {

                        const user = await requestUser(`/getUser/${comment.userId}`)
                        // currentUser.push(user.data)
                        return user.data
                    })
                )
                return users
            } else return []
        } catch (e) {
            console.log(e)
        }

    }


    const { data, isLoading } = useQuery({
        queryKey: ['userComment', post._id],
        queryFn: () => fetchUserComment(),
        enabled: !!currentComment?.length
    })

    useEffect(()=>{
        console.log('render comment:',commentRedux)
    },[commentRedux])
    return (
        <div className="comment-list">
            {isLoading ? (<SkeletonComment />) : (
                <>
                    {commentRedux.map((comment, i) => {
                           if(comment.postId == post._id){
                               return (
                                   <Comment  dataUser={currentUser} setUserReply={setUserReply} setParentComment={setParentComment} openCommentReplyInput={openCommentReplyInput} key={i} comment={comment} />
                               )
                           }
                        }
                    )}
                    {currentComment?.map((comment, i) => {
                        if (data)
                            return (
                                <Comment dataUser={data[i]} setUserReply={setUserReply} setParentComment={setParentComment} openCommentReplyInput={openCommentReplyInput} key={i} comment={comment} />

                            )
                    }
                    )}
                </>
            )
            }






            {/* <CommentReply />
             */}


        </div>
    );
}

export default CommentList;