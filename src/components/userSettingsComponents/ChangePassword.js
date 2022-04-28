import React, {useRef, useState} from 'react';import http from "../../plugins/http";import Dialog from "@mui/material/Dialog";import DialogTitle from "@mui/material/DialogTitle";import DialogContent from "@mui/material/DialogContent";import DialogActions from "@mui/material/DialogActions";import {Button} from "react-bootstrap";import {lightBlue} from "@mui/material/colors";const ChangePassword = ({setShowChangePassword, showChangePassword}) => {    const passwordRef = useRef()    const newPasswordRef = useRef()    const newPasswordTwoRef = useRef()    const [pswClass, setPswClass] = useState("form-control")    const [status, setStatus] = useState(null)    const [newPassword, setNewPassword] = useState(false)    const [newPsw1Class, setNewPsw1Class] = useState("form-control")    const [newPsw2Class, setNewPsw2Class] = useState("form-control")    const handleClose = () => {        setShowChangePassword(false);    };    function passwordValidation() {        if (passwordRef.current.value.length < 4) return setPswClass("form-control is-invalid")        if (passwordRef.current.value.length >= 4) return setPswClass("form-control is-valid")        if (passwordRef.current.value.length > 20) return setPswClass("form-control is-invalid")    }    async function changePassword() {        if (pswClass !== "form-control is-valid") {            setStatus('Enter old password')            return setPswClass("form-control is-invalid")        }        if (passwordRef.current.value.length >= 4) {            setPswClass("form-control is-valid")            setStatus('')            const userPassword = {                password: passwordRef.current.value            }            const data = await http.post('/submit-user-password', userPassword)            if (!data.success) {                setPswClass("form-control is-invalid")                return setStatus(data.message)            }            if (data.success) {                setPswClass("form-control")                passwordRef.current.value = ''                return setNewPassword(true)            }        }    }    function newPasswordValidation() {        if (newPasswordRef.current.value.length < 4) return setNewPsw1Class("form-control is-invalid")        if (newPasswordRef.current.value.length > 20) return setNewPsw1Class("form-control is-invalid")        if (newPasswordRef.current.value !== newPasswordTwoRef.current.value) return setNewPsw2Class("form-control is-invalid")        setNewPsw1Class("form-control is-valid")        setNewPsw2Class("form-control is-valid")    }    async function sendNewPassword() {        if (newPsw1Class && newPsw2Class !== "form-control is-valid") return setStatus('Passwords do not match')        const newPassword = {            password: newPasswordRef.current.value,            passwordTwo: newPasswordTwoRef.current.value        }        const data = await http.post('/submit-user-new-password', newPassword)        if (!data.success) {            setNewPsw1Class("form-control is-invalid")            setNewPsw2Class("form-control is-invalid")            return setStatus(data.message)        }        if (data.success) {            setShowChangePassword(false)        }    }    return (<div>        {!newPassword ?            <Dialog                open={showChangePassword}                onClose={handleClose}                aria-labelledby="alert-dialog-title"                aria-describedby="alert-dialog-description"            >                <DialogTitle color='red'>                    {"Enter old password"}                </DialogTitle>                <DialogContent>                    <div className="d-flex flex-column justify-content-center">                        <div className="w-75">                            <input ref={passwordRef} type="password" className={pswClass} onBlur={passwordValidation}                                   placeholder="Password" aria-label="Username"                                   aria-describedby="basic-addon1"                                   style={{                                       backgroundColor: '#f5f8fd'                                   }}/>                        </div>                        <div>                            <p className="statusMessage">{status}</p>                        </div>                    </div>                </DialogContent>                <DialogActions>                    <Button className="inputStyle mb-2" variant='secondary' onClick={handleClose}>                        Cancel                    </Button>                    <Button onClick={changePassword} className="inputStyle mb-2" variant='danger'>                        Submit                    </Button>                </DialogActions>            </Dialog> :            <Dialog                open={showChangePassword}                onClose={handleClose}                aria-labelledby="alert-dialog-title"                aria-describedby="alert-dialog-description"            >                <DialogTitle color='red'>                    {"Enter new password"}                </DialogTitle>                <DialogContent>                    <div className="d-flex flex-column align-items-center justify-content-center p-3">                        <div className="input-group mb-3 inputStyle">                            <input ref={newPasswordRef} type="password" className={newPsw1Class}                                   onBlur={newPasswordValidation}                                   placeholder="New password" aria-label="Username"                                   aria-describedby="basic-addon1"                                   style={{                                       backgroundColor: '#f5f8fd'                                   }}/>                        </div>                        <div className="input-group mb-3 inputStyle">                            <input ref={newPasswordTwoRef} type="password" className={newPsw2Class}                                   onBlur={newPasswordValidation}                                   placeholder="Repeat new password" aria-label="Username"                                   aria-describedby="basic-addon1"                                   style={{                                       backgroundColor: '#f5f8fd'                                   }}/>                        </div>                        <div>                            <p className="statusMessage">{status}</p>                        </div>                    </div>                </DialogContent>                <DialogActions>                    <Button className="inputStyle mb-2" variant='secondary' onClick={handleClose}>                        Cancel                    </Button>                    <Button onClick={sendNewPassword} className="inputStyle mb-2" variant='danger'>                        Submit                    </Button>                </DialogActions>            </Dialog>}    </div>);};export default ChangePassword;