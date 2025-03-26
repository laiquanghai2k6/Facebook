import { HTMLAttributes, useEffect, useRef, useState } from "react"
interface TextPostProp extends HTMLAttributes<HTMLDivElement> {
    text:string
}

const TextPost: React.FC<TextPostProp> = ({text,...other}) => {
    const [isTruncated, setIsTruncated] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    useEffect(()=>{
     
        if (textRef.current) {
             
            setIsTruncated(textRef.current.scrollHeight > textRef.current.clientHeight);
        }
    },[])
   




    return (
        <div className="text-post-container" {...other}>
            <p ref={textRef} className={`text-post ${expanded ? "expanded" : ""}`}>{text}</p>
            {isTruncated && (
                <span className="read-more" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Thu gọn" : "Xem thêm"} 
            </span>
            )} 
        </div>
    );
}

export default TextPost;