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
                        Bài viết
                    </div>
                ) : (
                    <div className="mid-profile-navigate-card" onClick={() => setCurrentNavigate1()}>
                        Bài viết
                    </div>
                )}
                {currentNavigate == 2 ? (
                    <div className="mid-profile-navigate-card-blue" onClick={() => setCurrentNavigate2()}>
                        Bạn bè
                    </div>
                ) : (
                    <div className="mid-profile-navigate-card" onClick={() => setCurrentNavigate2()}>
                        Bạn bè
                    </div>
                )}
            </div>
        </div>
    );
}

export default MidProfileNavigate;