import { PostShareType } from "../slices/postSlice";
import InteractPost from "./InteractPost";
import PostShareValue from "./PostShareValue";
import TextPost from "./TextPost";
import UserPost from "./UserPost";
import LoadingPost from "./LoadingPost";
import { useQuery } from "@tanstack/react-query";
import { fetchCommentLength } from "./Post";
type PostShareProps = {
    post: PostShareType
}

const PostShare = (
    { post }: PostShareProps
) => {
    const {data,isLoading} = useQuery({
        queryKey:['posts',post._id],
        queryFn:()=>fetchCommentLength(post._id)
    })
    return (
        <div className="post-container">
            {isLoading && <LoadingPost />}

            <UserPost userId={post.userId} time={post.createdAt}/>
            <TextPost  text={post.textShare} />
            <PostShareValue post={post} />
            <InteractPost isModal={true} type="share" post={post} lengthComment={data} />
        </div>
        );
}

export default PostShare;