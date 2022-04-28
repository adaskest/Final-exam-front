import {useEffect, useState} from 'react';
import "./authenticationStyle.css"
import Login from "./Login";
import Register from "./Register";
import {useParams} from "react-router-dom";

const Auth = () => {

    const [auth, setAuth] = useState({login: {isOpened: true}})
    const [message, setMessage] = useState();
    const [user, setUser] = useState();
    const {signup} = useParams()

    useEffect(() => {
        signup === 'login' ? handleShowLogin() : handleShowRegister()
    }, [signup])

    function handleShowLogin() {
        setAuth({login: {isOpened: true}})
    }

    function handleShowRegister() {
        setAuth({register: {isOpened: true}})
    }

    function handleShowSmsInput(message) {
        setAuth({smsInput: {isOpened: true}})
        setMessage(message);
    }

    return (
        <div className='auth-container'>
            <div className="disp-flex j-center">
                <div className="authFormDiv">
                    <div className="auth-tab-wrap">
                        <div onClick={handleShowLogin}
                             className={auth.login?.isOpened ? "btnClicked" : "authBtn"}>
                            Login
                        </div>
                        <div onClick={handleShowRegister}
                             className={auth.register?.isOpened ? "btnClicked" : "authBtn"}>
                            Register
                        </div>
                    </div>
                    <div className="authForm">
                        {auth.login?.isOpened && <Login setAuth={setAuth} message={message}/>}
                        {auth.register?.isOpened &&
                            <Register setAuth={setAuth} handleShowSmsInput={handleShowSmsInput} setUser={setUser}/>}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Auth;