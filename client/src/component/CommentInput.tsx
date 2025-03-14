import { useEffect } from "react";
import UserImage from "./UserImage";
import Send from '../assets/send.png'
import Camera from '../assets/camera.png'
import HomeItem from "./HomeItem";

const CommentInput = () => {

    useEffect(() => {
        const textarea = document.getElementById("text-comment-input");

        if (textarea) {
            textarea.addEventListener("input", function () {
                (this as HTMLTextAreaElement).rows = 1;
                const computedStyle = window.getComputedStyle(this);

                let lineHeight = parseFloat(computedStyle.lineHeight);
                if (isNaN(lineHeight)) {
                    lineHeight = parseFloat(computedStyle.fontSize) * 1.2;
                }


                const lines = Math.floor(this.scrollHeight / lineHeight);
                const currentRows = Math.max(1, lines);
                if (currentRows > (this as HTMLTextAreaElement).rows) {
                    if(currentRows >=7) (this as HTMLTextAreaElement).rows = 7;
                    else (this as HTMLTextAreaElement).rows = currentRows;
                }
            });
        }
    }, [])




    return (
        <>
            <div className="comment-input">
                <div style={{display:'flex',flexDirection:'row',margin:'2vh 0 0 1.5vh'}}>

                <UserImage height={'5vh'} width={'5vh'} />
                <textarea className="text-comment-input" id="text-comment-input" rows={1} placeholder="Bình luận dưới tên hải"></textarea>
                </div>
                <div style={{height:'5vh',backgroundColor:'#333334', display: 'flex',alignItems:'center', justifyContent:'space-between',flexDirection: 'row', color: '#aeb1b6', fontSize: '1.8vh', marginLeft: '7.5vh',borderRadius:'0 0 2vh 2vh' }}>
                    <HomeItem img={Camera}  styleImg={{width:'3vh',height:'3vh'}} styleContainer={{marginLeft:'2vh'}} />
                    <HomeItem img={Send} styleImg={{width:'3vh',height:'3vh'}} />
                    
                </div>
            </div>

        </>
    );
}

export default CommentInput;