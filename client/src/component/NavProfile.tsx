import test2 from '../assets/test2.png'

const NavProfile = () => {
    return (
        <div className="nav-profile">
            <div className='image-profile' >

                <div className="image-post">
                    <img src={test2} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
            </div>
        </div>

    );
}

export default NavProfile;