import React from "react";


interface MidProfileNavigateProps {
    currentNavigate: number,
    setCurrentNavigate1: Function
    setCurrentNavigate2: Function


}

const MidProfileNavigate: React.FC<MidProfileNavigateProps> = ({ currentNavigate, setCurrentNavigate1, setCurrentNavigate2 }) => {
    return (
        <div className="mid-profile-navigate">
            <div className="mid-profile-navigate-left">
                {currentNavigate == 1 ? (
                    <div className="mid-profile-navigate-card-blue" onClick={() => setCurrentNavigate1()}>
                        <p>Bài viết</p>
                    </div>
                ) : (
                    <div className="mid-profile-navigate-card" onClick={() => setCurrentNavigate1()}>
                        <p>Bài viết</p>
                    </div>
                )}
                {currentNavigate == 2 ? (
                    <div className="mid-profile-navigate-card-blue" onClick={() => setCurrentNavigate2()}>
                        <p>Bạn bè</p>
                    </div>
                ) : (
                    <div className="mid-profile-navigate-card" onClick={() => setCurrentNavigate2()}>
                        <p>Bạn bè</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MidProfileNavigate;