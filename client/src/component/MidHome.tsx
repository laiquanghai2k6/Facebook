import React, { useCallback, useEffect, useRef, useState } from "react";
import { User } from "../slices/userSlice";
import CreatePost from "./CreatePost";
import Post from "./Post";
import ModalCreatePost from "./ModalCreatePost";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { requestPost } from "../service/service";
import { PostShareType, PostType } from "../slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

import { Virtuoso } from 'react-virtuoso';
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import LoadingPost from "./LoadingPost";
import PostShare from "./PostShare";
type MidHomeProps = {

}
export type PostRequest = {
    post:Array<PostType|PostShareType>
    hasMore:boolean
    page:number
}
const limit = 10
const MidHome: React.FC<MidHomeProps> = () => {
    const [createPostModal, setCreatePostModal] = useState(false)
    const storePost = useSelector((state: RootState) => state.post.posts)
     
    const modalOpen = useCallback(() => {
        setCreatePostModal(true)
    }, [createPostModal])
    const modalClose = useCallback(() => {
        
        setCreatePostModal(false)
    }, [createPostModal])

    const fetchAllPost = async ({pageParam = 1}) => {
        try {
            const response = await requestPost.get(`/getAllPost?limit=${limit}&page=${pageParam}`)
            return response.data as PostRequest
        } catch (e) {
            alert('Lỗi tải bài viết')
            console.log(e)
        }

    }

    const {
        data,
        fetchNextPage,
        hasNextPage
    } =useInfiniteQuery({
        queryKey:['posts'],
        queryFn:fetchAllPost,
        initialPageParam:1,
        getNextPageParam:(lastPage)=>{
            return lastPage?.hasMore ? lastPage.page+1 :undefined
        }
    })
    const observer = useRef<IntersectionObserver |null>(null);

    const lastElementRef = useCallback((node:HTMLDivElement |null) => {
        if (!hasNextPage && observer.current) observer.current.disconnect();
          observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
              fetchNextPage();
            }
          },{
            rootMargin:'-300px'
          });
    
          if (node) observer.current.observe(node);
        },[hasNextPage]);
    

    return (
        <div className="mid-home" >
            {createPostModal && <ModalCreatePost setCreatePostModal={modalClose} />}
            <CreatePost setCreatePostModal={modalOpen} />
            {/* <Virtuoso
                style={{
                    scrollbarWidth:'none',
                    marginTop:'2em'
                }}
                data={allPost}
                defaultItemHeight={200} // Giá trị ước lượng ban đầu
                increaseViewportBy={500} // Load trước các bài viết gần khung nhìn
                itemContent={(index, post) => (
                    <Post post={post} />
                )}
            /> */}

            <div className="post-list-container">
                {storePost.map((post, index) => {
                    if(post.type == "own")
                    return (
                        <Post key={index} post={post} />
                    )
                    else return (
                        <PostShare key={index} post={post as PostShareType} />
                    )
                })}
            </div>
            <div className="post-list-container">
                {data?.pages.map((pages)=>{
                    return(
                        pages?.post.map((post,index)=>
                        {
                            if(post.type == "own")
                                return (
                                    <Post key={index} post={post} />
                                )
                                else return (
                                    <PostShare key={index} post={post as PostShareType} />
                                )
                        })
                    )
                })}
              
            </div>

            <div ref={lastElementRef} style={{ height: "1px",color:'#1c1c1d' }} >lastElement</div>
            {(hasNextPage) && <LoadingPost />}
            {/* <LoadingPost /> */}
            
        </div>


    );
}

export default MidHome;