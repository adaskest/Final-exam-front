import {useContext, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./authenticationStyle.css"
import http from "../../plugins/http";
import {Button} from "react-bootstrap";
import mainContext from "../../context/mainContext";

const Login = () => {

    const {setUser} = useContext(mainContext)
    const [status, setStatus] = useState(null)
    const [stayLoggedIn, setStayLoggedIn] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const nav = useNavigate()
    const [emailClass, setEmailClass] = useState("form-control")
    const [pswClass, setPswClass] = useState("form-control")

    async function validateUserForm() {
        emailValidation()
        passwordValidation()
        await sendRequest()
    }

    async function sendRequest() {
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            stayLoggedIn
        }
        const res = await http.post("/login", user)
        console.log(res)
        if (res.success) {
            setUser(res.user)
            setStatus(null)
            nav("/")
            if (stayLoggedIn) return localStorage.setItem("stayLoggedIn", "true")
        } else {
            setStatus(res.message)
            if (res.message === "Bad credentials") {
                setEmailClass("form-control is-invalid")
                setPswClass("form-control is-invalid")
            }
        }
    }

    function emailValidation() {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailRef.current.value)) {
            emailRef.current.value = ''
            setStatus('Email should be like \"email@email.com\"')
            return setEmailClass("form-control is-invalid")
        }
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailRef.current.value)) {
            setStatus(null)
            setEmailClass("form-control is-valid")
        }
    }

    function passwordValidation() {
        if (passwordRef.current.value.length < 4 || passwordRef.current.value.length > 25) {
            passwordRef.current.value = ''
            setStatus("Password should be min 4 max 25 characters")
            return setPswClass("form-control is-invalid")
        }
        if (passwordRef.current.value.length >= 4) {
            setStatus(null)
            setPswClass("form-control is-valid")
        }
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="mb-3 inputStyle">
                <div className="input-group">
                    <span className="input-group-text" id="basic-addon1">@</span>
                    <input ref={emailRef} type="email" className={emailClass} onBlur={emailValidation}
                           placeholder="Email address" aria-label="Email"
                           aria-describedby="basic-addon1"
                           style={{
                               backgroundColor: '#f5f8fd', fontSize: '16px'
                           }}/>
                </div>
            </div>
            <div className="mb-3 inputStyle">
                <div className="input-group">
                    <input ref={passwordRef} type="password" className={pswClass} onBlur={passwordValidation}
                           placeholder="Password" aria-label="Username"
                           aria-describedby="basic-addon1"
                           style={{
                               backgroundColor: '#f5f8fd', fontSize: '16px'
                           }}/>
                </div>
            </div>
            <div className="mb-3 inputStyle d-flex justify-content-between">
                <div className="form-check">
                    <input onClick={() => setStayLoggedIn(!stayLoggedIn)} className="form-check-input auth-form-check"
                           type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault"
                           style={{fontWeight: 550, color: '#e94c89', fontSize: '14px'}}>Stay logged in? </label>
                </div>
            </div>
            <Button className="inputStyle auth-btn" onClick={validateUserForm}>Login</Button>
            <div>
                <p className="statusMessage">{status}</p>
            </div>
        </div>
    );
};

export default Login;