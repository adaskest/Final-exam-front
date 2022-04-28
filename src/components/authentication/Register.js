import {useRef, useState} from 'react';
import "./authenticationStyle.css"
import http from "../../plugins/http";
import {Button} from "react-bootstrap";
import {FormText} from "react-bootstrap";

const Register = ({handleShowSmsInput, setUser}) => {

    const [status, setStatus] = useState(null)
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordTwoRef = useRef()
    const phoneNumberRef = useRef()
    const isMounted = true;

    function sendRequest() {

        const newUser = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            passwordTwo: passwordTwoRef.current.value,
        }
        setUser(newUser);

        http.post("/register", newUser).then(res => {
            console.log(res)
            if (res.success) {
                setStatus(res.message)
            } else {
                setStatus(res.message)
                usernameValidation()
                emailValidation()
                passwordValidation()
                passwordTwoValidation()
            }
            if (res.message === "Toks slapyvardis egzistuoja") return setUsernameClass("form-control is-invalid")
            if (res.message === "Toks el. paštas jau užregistruotas") return setEmailClass("form-control is-invalid")
        })
    }

    const [usernameClass, setUsernameClass] = useState("form-control")
    const [emailClass, setEmailClass] = useState("form-control")
    const [pswClass, setPswClass] = useState("form-control")
    const [pswTwoClass, setTwoPswClass] = useState("form-control")

    function usernameValidation() {
        if (usernameRef.current.value.length < 4) return setUsernameClass("form-control is-invalid")
        if (usernameRef.current.value.length >= 4) return setUsernameClass("form-control is-valid")
        if (usernameRef.current.value.length > 20) return setUsernameClass("form-control is-invalid")
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

    function passwordTwoValidation() {
        if (passwordTwoRef.current.value.length < 4) return setTwoPswClass("form-control is-invalid")
        if (passwordRef.current.value !== passwordTwoRef.current.value) return setTwoPswClass("form-control is-invalid")
        if (passwordTwoRef.current.value.length >= 4) return setTwoPswClass("form-control is-valid")
        if (passwordTwoRef.current.value.length > 20) return setTwoPswClass("form-control is-invalid")
    }

    return (
        <div className="d-flex flex-column align-items-center p-3 position-relative">
            <div className="inputStyle mb-3 mt-2">
                <div className="input-group">
                    <input ref={usernameRef} type="text" className={usernameClass} onBlur={usernameValidation}
                           placeholder="Username" aria-label="Username"
                           aria-describedby="basic-addon1"
                           style={{
                               backgroundColor: '#f5f8fd',
                               fontSize: '14px'
                           }}/>
                </div>
            </div>
            <div className="mb-3 inputStyle">
                <div className="input-group">
                    <span className="input-group-text" id="basic-addon1">@</span>
                    <input ref={emailRef} type="email" className={emailClass} onBlur={emailValidation}
                           placeholder="Email address" aria-label="Email"
                           aria-describedby="basic-addon1"
                           style={{
                               backgroundColor: '#f5f8fd',
                               fontSize: '14px'
                           }}/>
                </div>
            </div>
            <div className="mb-3 inputStyle">
                <div className="input-group">
                    <input ref={passwordRef} type="password" className={pswClass} onBlur={passwordValidation}
                           placeholder="Password" aria-label="Username"
                           aria-describedby="basic-addon1"
                           style={{
                               backgroundColor: '#f5f8fd',
                               fontSize: '14px'
                           }}/>
                </div>
            </div>
            <div className="mb-3 inputStyle">
                <div className="input-group">
                    <input ref={passwordTwoRef} type="password" className={pswTwoClass} onBlur={passwordTwoValidation}
                           placeholder="Repeat password" aria-label="Username"
                           aria-describedby="basic-addon1"
                           style={{
                               backgroundColor: '#f5f8fd',
                               fontSize: '14px'
                           }}/>
                </div>
            </div>
            <div>
                <hr/>
                <Button className="inputStyle mt-3 auth-btn" data-toggle="modal" data-target="#myModal"
                        onClick={sendRequest} variant="primary">
                    Register
                </Button>
            </div>

            <div className='mt-2'>
                <p className={'statusMessage'}>{status}</p>
            </div>
        </div>
    );
};

export default Register;