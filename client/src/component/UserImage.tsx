import React, { useEffect, useRef, useState } from "react";
import Default from '../assets/default-image.png'
import "react-lazy-load-image-component/src/effects/blur.css";
interface UserImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    width?: number | string;
    height?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;
    className?: string;
    img?: string;
    classNameImg?:string

}
export const useLazyLoad = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLImageElement |null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                
                setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return [ref, isVisible] as const;
};
const UserImage = ({ img,id, width, height,classNameImg, className = 'icon-round-background', minHeight, minWidth, children, ...other }: UserImageProps) => {
    const [ref, isVisible] = useLazyLoad();
    return (
        <div id={id} className={className} style={{ width: width, height: height, minHeight: minHeight, minWidth: minWidth }} {...other}>
            <img
                className={classNameImg}
                ref={ref}
                src={(isVisible && img ) ? img : Default}
                style={{
                    width: '115%',
                    height: '115%',
                    objectFit: 'cover',
                    display: 'block',
                    position: 'absolute',
                    borderRadius: '50%',
                    opacity: isVisible ? '1' : '0.5',
                    transition: "opacity 0.3s"
                }}
                alt="Ảnh"
    

            />
            {children}
        </div>
    );
}

export default UserImage;