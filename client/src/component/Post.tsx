import React, { HTMLAttributes } from "react";
import TextPost from "./TextPost";
import UserPost from "./UserPost";
import ImagePost from "./ImagePost";
import InteractPost from "./InteractPost";
import { PostType } from "../slices/postSlice";
import VideoPost from "./VideoPost";
import { requestComment } from "../service/service";
import { useQuery } from '@tanstack/react-query'
import LoadingPost from "./LoadingPost";

interface PostProps extends HTMLAttributes<HTMLDivElement> {
    post: PostType,

}
export const fetchCommentLength = async (postId: string) => {
    const response = await requestComment.get(`/getLengthCommentOfPost/${postId}`);
    return response.data;
};
const Post: React.FC<PostProps> = ({ post }) => {

    const { data, isLoading } = useQuery({
        queryKey: ['posts', post?._id],
        queryFn: () => fetchCommentLength(post?._id)
    })
    return (
        <>
            {isLoading || !post ? <LoadingPost />
                : (

                    <div className="post-container">
                        <UserPost userId={post.userId} time={post.createdAt} />
                        <TextPost text={post.text} />
                        {post.video != "" && <VideoPost src={post.video} />}
                        {post.image != "" && <ImagePost img={post.image} />}
                        <InteractPost isModal={true} type="own" lengthComment={data} post={post} />
                    </div>

                )
            }
        </>
    );
}

export default Post;