import React from "react";
import TextPost from "./TextPost";
import UserPost from "./UserPost";
import ImagePost from "./ImagePost";
import imgtest from '../assets/imgtest.jpg'
import test2 from '../assets/test2.png'
import InteractPost from "./InteractPost";

interface PostProps{
   
}

const Post:React.FC<PostProps> = () => {
    return (
        <div className="post-container">
            <UserPost />
            <TextPost />
            <ImagePost img={test2}/>
            <InteractPost />
        </div>
      );
}
 
export default Post;