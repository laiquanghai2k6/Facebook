import { HTMLAttributes, useEffect, useRef, useState } from "react"
interface TextPostProp extends HTMLAttributes<HTMLDivElement> {

}

const TextPost: React.FC<TextPostProp> = ({...other}) => {
    const [isTruncated, setIsTruncated] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    let text = `asd \n sadasá \nsafd \nád \n dsfds `
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