import {useEffect, useState} from 'react';
import "./authenticationStyle.css"
import Login from "./Login";
import Register from "./Register";
import {useNavigate, useParams} from "react-router-dom";

const Auth = () => {

    const [auth, setAuth] = useState({login: {isOpened: true}})
    const {signup} = useParams()
    const nav = useNavigate()


    useEffect(() => {
        signup === 'login' ? handleShowLogin() : handleShowRegister()
    }, [signup])

    function handleShowLogin() {
        setAuth({login: {isOpened: true}})
    }

    function handleShowRegister() {
        setAuth({register: {isOpened: true}})
    }

    return (
        <div className='auth-container'>
            <div className="disp-flex j-center">
                <div className="authFormDiv">
                    <div className="auth-tab-wrap">
                        <div onClick={() => {
                            nav('/authentic/login')
                        }}
                             className={auth.login?.isOpened ? "btnClicked" : "authBtn"}>
                            Login
                        </div>
                        <div onClick={()=> nav('/authentic/register')}
                             className={auth.register?.isOpened ? "btnClicked" : "authBtn"}>
                            Register
                        </div>
                    </div>
                    <div className="authForm">
                        {auth.login?.isOpened && <Login/>}
                        {auth.register?.isOpened && <Register/>}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Auth;