import React, { forwardRef, HTMLAttributes, useEffect, useRef, useState } from "react";
import TextPost from "./TextPost";
import UserPost from "./UserPost";
import ImagePost from "./ImagePost";
import imgtest from '../assets/imgtest.jpg'
import test2 from '../assets/test2.png'
import InteractPost from "./InteractPost";
import { PostType } from "../slices/postSlice";
import VideoPost from "./VideoPost";
import { CommentType } from "../slices/commentSlice";
import { requestComment } from "../service/service";
import Spinner from "./Spinner";
import {useQuery} from '@tanstack/react-query'
import LoadingPost from "./LoadingPost";

interface PostProps extends HTMLAttributes<HTMLDivElement>{
   post:PostType,

}
const fetchCommentLength = async (postId:string) => {
    const response = await requestComment.get(`/getLengthCommentOfPost/${postId}`);
    return response.data;
};
const Post:React.FC<PostProps>=({ post }) => {

    const {data,isLoading} = useQuery({
        queryKey:['posts',post._id],
        queryFn:()=>fetchCommentLength(post._id)
    })

    return (
         <div className="post-container">
        
            {isLoading && <LoadingPost />}
            <UserPost userId={post.userId} time={post.createdAt}/>
            <TextPost  text={post.text} />
            {post.video!="" && <VideoPost src={post.video} />}
            {post.image !="" && <ImagePost img={post.image}/>}
            <InteractPost lengthComment={data} post={post} />
        </div>
     
      );
}
 
export default Post;