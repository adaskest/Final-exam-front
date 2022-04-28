import {useContext, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./authenticationStyle.css"
import http from "../../plugins/http";
import {Button} from "react-bootstrap";
import mainContext from "../../context/mainContext";

const Login = ({setAuth}) => {

    const {setUser, setActivateAccount} = useContext(mainContext)
    const [status, setStatus] = useState(null)
    const [stayLoggedIn, setStayLoggedIn] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const nav = useNavigate()
    const [emailClass, setEmailClass] = useState("form-control")
    const [pswClass, setPswClass] = useState("form-control")

    function sendRequest() {
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            stayLoggedIn
        }
        http.post("/login", user).then(res => {
            console.log(res)
            if (res.success) {
                setUser(res.user)
                setStatus(null)
                nav("/")
                if (stayLoggedIn) return localStorage.setItem("stayLoggedIn", "true")
            } else {
                setStatus(res.message)
                emailValidation()
                passwordValidation()
            }
            if (res.message === "Neteisingi prisijungimo duomenys") {
                setEmailClass("form-control is-invalid")
                setPswClass("form-control is-invalid")
            }
        })
    }

    function emailValidation() {
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailRef.current.value)) return setEmailClass("form-control is-valid")
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailRef.current.value)) return setEmailClass("form-control is-invalid")
    }

    function passwordValidation() {
        if (passwordRef.current.value.length < 4) return setPswClass("form-control is-invalid")
        if (passwordRef.current.value.length >= 4) return setPswClass("form-control is-valid")
        if (passwordRef.current.value.length > 20) return setPswClass("form-control is-invalid")
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="input-group mb-3 inputStyle">
                <input ref={emailRef} type="email" className={emailClass} onBlur={emailValidation}
                       placeholder="Email address" aria-label="Email"
                       aria-describedby="basic-addon1"
                       style={{
                           backgroundColor: '#f5f8fd'
                       }}/>
            </div>
            <div className="input-group mb-3 inputStyle">
                <input ref={passwordRef} type="password" className={pswClass} onBlur={passwordValidation}
                       placeholder="Password" aria-label="Username"
                       aria-describedby="basic-addon1"
                       style={{
                           backgroundColor: '#f5f8fd'
                       }}/>
            </div>
            <div className="mb-3 inputStyle d-flex justify-content-between">
                <div className="form-check">
                    <input onClick={() => setStayLoggedIn(!stayLoggedIn)} className="form-check-input auth-form-check"
                           type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault" style={{fontWeight: 550, color: '#5557d4', fontSize: '14px'}}>Stay logged in? </label>
                </div>
            </div>
            <Button className="inputStyle auth-btn" onClick={sendRequest}>Login</Button>
            <div>
                <p className="statusMessage">{status}</p>
            </div>
        </div>
    );
};

export default Login;