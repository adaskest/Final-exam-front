import React, {useContext, useEffect, useRef, useState} from 'react';
import mainContext from "../../context/mainContext";
import './sidebarStyle.css'
import {BsCamera} from "react-icons/bs";
import {RiLockPasswordLine} from "react-icons/ri";
import ChangePassword from "../userSettingsComponents/ChangePassword";
import ChangePhoto from "../userSettingsComponents/ChangePhoto";

const Sidebar = () => {

    const {user, setUser} = useContext(mainContext)
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [showChangePhoto, setShowChangePhoto] = useState(false)

    return (
        <div className="profile-sidebar-wrap">
            <div className="align-center-column" style={{userSelect: "none"}}>
                <div className="profile-photo-username-wrap">
                    <img className="userPhoto" src={user?.photo} alt=""/>
                    <div className="d-flex flex-column align-items-center">
                        <p className="profile-username">{user?.username}</p>
                    </div>
                </div>

                <div className="flex sidebar-tab-wrap ">
                    <hr/>
                    <div>
                        <div className='sidebar-underTab'>
                            <div onClick={() => setShowChangePhoto(true)} className='sidebar-tab'>
                                <BsCamera/>
                                <p className='ms-lg-3'>Change profile picture</p>
                            </div>
                            <div onClick={() => setShowChangePassword(true)} className='sidebar-tab'>
                                <RiLockPasswordLine/>
                                <p className='ms-lg-3'>Change password</p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
                {showChangePassword &&
                    <ChangePassword setShowChangePassword={setShowChangePassword}
                                    showChangePassword={showChangePassword}/>}
                {showChangePhoto &&
                    <ChangePhoto showChangePhoto={showChangePhoto} setShowChangePhoto={setShowChangePhoto}
                                 setUser={setUser}/>}
            </div>
        </div>
    );
};
export default Sidebar;
