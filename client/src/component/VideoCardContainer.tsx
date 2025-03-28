import { useInfiniteQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import { requestPost } from "../service/service";
import { PostRequest } from "./MidHome";
import { useRef } from "react";
import { entries } from "lodash";
import LoadingPost from "./LoadingPost";
import { PostShareType } from "../slices/postSlice";
import PostShare from "./PostShare";
import Post from "./Post";

const VideoCardContainer = () => {
    const FetchVideo = async (pageParam:number)=>{
        try{
            const limit = 3
            const resposne = await requestPost(`/getVideo?limit=${limit}&page=${pageParam}`)
            return resposne.data as PostRequest
        }catch(e){
            console.log(e)
            alert('Lỗi tải video')
        }
    }
    const {
        data,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey:['video'],
        initialPageParam:1,
        queryFn:({pageParam})=>FetchVideo(pageParam),
        getNextPageParam:(lastPage)=>{
            return lastPage?.hasMore ? lastPage?.page+1 :undefined
        },


    })
    const observer = useRef<IntersectionObserver | null>(null)
    const lastElementRef = (node:HTMLDivElement)=>{
        if(!hasNextPage && observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting){
                fetchNextPage()
            }
        },{
            rootMargin:'-300px'
        })
        
        if(node) observer.current?.observe(node)
    }
  
    return ( 
        <div className="video-card-container">
            
            {data?.pages.map((page)=>{
                return(
                    page?.post.map((video,index)=>{
                        if(video.type == "own"){

                            return (
                                <Post key={index} post={video} />
                            )
                        }else return (
                                <PostShare key={index} post={video as PostShareType} />
                            )
                    })
                )
            })}
            <div ref={lastElementRef}></div>
            {hasNextPage && <LoadingPost />}

        </div>
     );
}
 
export default VideoCardContainer;