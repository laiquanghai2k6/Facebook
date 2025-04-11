import React from "react";

interface ImageChainProps {
    img?: string,
    type?: string
}

const ImageChain: React.FC<ImageChainProps> = ({ img, type = 'image-chain' }) => {
    return (
        <>
            {type == 'image-chain-loading' ? (
                <div className={type}>
                </div>
            ) : (
                <div className={type}>
                    <img src={img}
                        style={{
                            width: '115%',
                            position: 'absolute',
                            height: '115%',
                            objectFit: 'cover',
                            display: 'block',
                            borderRadius: '50%',
                            // borderRadius:'50%'
                        }}
                    />
                </div>
            )}
        </>

    );
}

export default ImageChain;
// .icon-round-background {
//     user-select: none;
//     display: flex;
//     width: 5vh;
//     height: 5vh;
//     border-radius: 50%;
//     background-color: #3b3d3e;
//     text-align: center;
//     align-items: center;
//     justify-content: center;
//     overflow: hidden;
//     position: relative;
//     cursor: pointer;
//   }