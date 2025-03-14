import Comment from "./Comment";
import CommentInput from "./CommentInput";
import CommentReply from "./CommentReply";

const CommentList = () => {
    return ( 
        <div className="comment-list">
            <Comment />
            <CommentReply />
            <Comment />
            <Comment />
            <Comment />
            

        </div>
     );
}
 
export default CommentList;