import React from "react";
import CloseButton from "./button/CloseButton";
import UserPost from "./UserPost";
import TextPost from "./TextPost";
import ImagePost from "./ImagePost";
import InteractPost from "./InteractPost";
import test2 from '../assets/test2.png'
import Hr from "./Hr";

interface ModalCommentProps {
    setModalComment: Function
}

const ModalComment: React.FC<ModalCommentProps> = ({ setModalComment }) => {
let text = `asd \n sadasá \nsafd \nád \n dsfds `
    return (
        <div className="modal-comment-container">
            <div className="modal-comment-box">
                <p style={{position:'absolute',top:'0',left:'40%',marginTop:'3vh',fontWeight:'bold'}}>Bài viết của lqh</p>
                <Hr />
                <CloseButton onClick={() => setModalComment(false)} />
                <UserPost />
                <div className="text-post-container">
            <p className={`text-post-comment `}>{text}</p>
            
        </div>
                <ImagePost img={test2} />
                <InteractPost />
            </div>
        </div>
    );
}

export default ModalComment;