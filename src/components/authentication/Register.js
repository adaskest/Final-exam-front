import {useRef, useState} from 'react';
import "./authenticationStyle.css"
import http from "../../plugins/http";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const [status, setStatus] = useState(null)
    const [photo, setPhoto] = useState('');
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordTwoRef = useRef()
    const photoRef = useRef()
    const nav = useNavigate()

    async function validateUserForm() {
        usernameValidation()
        emailValidation()
        passwordValidation()
        passwordTwoValidation()
        if (!photo.includes('http')) {
            return setStatus("Photo link should include \"http\"")
        }
        await sendRequest()
    }

    async function sendRequest() {
        const newUser = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            photo,
            password: passwordRef.current.value,
            passwordTwo: passwordTwoRef.current.value,
        }
        const res = await http.post("/register", newUser)
        console.log(res)
        if (res.success) {
            nav('/authentic/login')
        } else {
            setStatus(res.message)
            if (res.message === "Username exists") return setUsernameClass("form-control is-invalid")
            if (res.message === "Email exists") return setEmailClass("form-control is-invalid")
        }
    }

    const [usernameClass, setUsernameClass] = useState("form-control")
    const [emailClass, setEmailClass] = useState("form-control")
    const [photoClass, setPhotoClass] = useState("form-control")
    const [pswClass, setPswClass] = useState("form-control")
    const [pswTwoClass, setTwoPswClass] = useState("form-control")

    function usernameValidation() {
        if (usernameRef.current.value.length < 4 || usernameRef.current.value.length > 20) {
            usernameRef.current.value = ''
            setStatus("Username should be min 4 max 20 characters")
            return setUsernameClass("form-control is-invalid")
        }
        if (usernameRef.current.value.length >= 4) {
            setStatus('')
            setUsernameClass("form-control is-valid")
        }
    }

    function emailValidation() {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailRef.current.value)) {
            emailRef.current.value = ''
            setStatus('Email should be like \"email@email.com\"')
            return setEmailClass("form-control is-invalid")
        }
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailRef.current.value)) {
            setStatus('')
            setEmailClass("form-control is-valid")
        }
    }

    function photoValidation() {
        if (!photoRef.current.value.includes('http')) {
            photoRef.current.value = ''
            setStatus("Photo link should include \"http\"")
            return setPhotoClass("form-control is-invalid")
        }
        if (photoRef.current.value.includes('http')) {
            setPhoto(photoRef.current.value)
            setStatus('')
            setPhotoClass("form-control is-valid")
        }
    }

    function passwordValidation() {
        if (passwordRef.current.value.length < 4 || passwordRef.current.value.length > 25) {
            passwordRef.current.value = ''
            setStatus("Password should be min 4 max 25 characters")
            return setPswClass("form-control is-invalid")
        }
        if (passwordRef.current.value.length >= 4) {
            setStatus('')
            setPswClass("form-control is-valid")
        }
    }

    function passwordTwoValidation() {
        if (passwordRef.current.value !== passwordTwoRef.current.value) {
            passwordTwoRef.current.value = ''
            setStatus('Passwords should match')
            return setTwoPswClass("form-control is-invalid")
        }
        if (passwordTwoRef.current.value.length >= 4) {
            setStatus('')
            setTwoPswClass("form-control is-valid")
        }
    }

    function previewPicture() {
        if (photoClass === "form-control is-valid") {
            setStatus('')
            setPhoto(photoRef.current.value)
            photoRef.current.value = ''
        } else {
            setStatus('Profile picture should include "http"')
        }
    }

    function deletePicture() {
        setPhoto('')
        setPhotoClass("form-control")
    }

    return (<div className="d-flex flex-column align-items-center p-3 position-relative">
        <div className="inputStyle mb-3 mt-2">
            <div className="input-group">
                <input ref={usernameRef} type="text" className={usernameClass} onBlur={usernameValidation}
                       placeholder="Username"
                       aria-label="Username"
                       aria-describedby="basic-addon1"
                       style={{
                           backgroundColor: '#f5f8fd', fontSize: '16px'
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
                           backgroundColor: '#f5f8fd', fontSize: '16px'
                       }}/>
            </div>
        </div>
        <div>
            {photo.length > 0 && <div className='d-flex flex-column p-1 align-items-center justify-content-center mb-3'>
                <img className='smallImg' src={photo} alt=""/>
                <Button className="inputStyle mt-3 auth-btn" data-toggle="modal" data-target="#myModal"
                        onClick={deletePicture} variant="primary">
                    Delete picture
                </Button>
            </div>}
        </div>
        {photo.length === 0 && <div className="inputStyle mb-3 mt-2">
            <div className="input-group">
                <input ref={photoRef} type="text" className={photoClass} onBlur={photoValidation}
                       placeholder="Profile picture URL" aria-label="Username"
                       aria-describedby="basic-addon1"
                       style={{
                           backgroundColor: '#f5f8fd', fontSize: '16px'
                       }}/>
            </div>

            <Button className="inputStyle mt-3 auth-btn" data-toggle="modal" data-target="#myModal"
                    onClick={previewPicture} variant="primary">
                Add picture
            </Button>
        </div>}
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
        <div className="mb-3 inputStyle">
            <div className="input-group">
                <input ref={passwordTwoRef} type="password" className={pswTwoClass} onBlur={passwordTwoValidation}
                       placeholder="Repeat password" aria-label="Username"
                       aria-describedby="basic-addon1"
                       style={{
                           backgroundColor: '#f5f8fd', fontSize: '16px'
                       }}/>
            </div>
        </div>
        <div>
            <Button className="inputStyle mt-3 auth-btn" data-toggle="modal" data-target="#myModal"
                    onClick={validateUserForm} variant="primary">
                Register
            </Button>
        </div>

        <div className='mt-2'>
            <p className={'statusMessage'}>{status}</p>
        </div>
    </div>);
};

export default Register;