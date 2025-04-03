import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Post from "./Post";
import { User, UserInfo } from "../slices/userSlice";
import { requestPost } from "../service/service";
import LoadingPost from "./LoadingPost";
import { PostShareType, PostType } from "../slices/postSlice";
import { useCallback, useRef } from "react";
import { PostRequest } from "./MidHome";
import PostShare from "./PostShare";

type PostProfileProps = {
    currentUserId:string
}

const PostProfile = ({currentUserId}:PostProfileProps) => {

    const observer = useRef<IntersectionObserver | null>(null)
    const getPostOfUser = async (userId:string,pageParam:number)=>{
        
        try{
            const limit = 10
            console.log('userId:',userId)
            const response = await requestPost.get(`/getPostOfOneUser?userId=${userId}&page=${pageParam}&limit=${limit}`)
            return response.data as PostRequest
        }catch(e){
            console.log(e)
            return alert('Lỗi tải bài viết người dùng')
        }
    }

    const {data,fetchNextPage,hasNextPage} = useInfiniteQuery({
        queryKey:['post:',currentUserId],
        queryFn:({pageParam})=>getPostOfUser(currentUserId,pageParam),
        initialPageParam:1,
        getNextPageParam:(lastPage)=>{
            return lastPage?.hasMore ? lastPage.page+1 :undefined
        }
    })
    const lastElementRef = useCallback((node:HTMLDivElement)=>{
        if(!hasNextPage && observer.current)  observer.current.disconnect()
        observer.current = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting){
                fetchNextPage()
            }

        },{
            rootMargin:'-300px'
        })
        if(node) observer.current.observe(node)


    },[hasNextPage])
    

    return (
        

        <div className="post-profile-container">
        
         {data?.pages.map((pages,i)=>{
                    if(i == 0 && pages?.post.length == 0) return(
                        <p key={i} style={{fontWeight:'bold',color:'white',fontSize:'2rem',alignSelf:'center'}}>Chưa có bài viết nào</p>
                    )
                    return(
                        pages?.post.map((post)=>
                        {
                            if(post.type == "own")
                                return (
                                    <Post key={post._id} post={post} />
                                )
                                else return (
                                    <PostShare key={post._id} post={post as PostShareType} />
                                )
                        })
                    )
        })}
        <div ref={lastElementRef} style={{ height: "1px",color:'#1c1c1d' }} >lastElement</div>
        {hasNextPage && <LoadingPost />}
        </div>
        
     );
}
 
export default PostProfile;