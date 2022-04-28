import React, {useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import http from "../../plugins/http";

const SmsInput = ({setAuth, message, user, phoneNumber, setUser, setShowChangePhoneModal, setChangePhone}) => {

    const smsCodeRef = useRef();
    const [error, setError] = useState('')


    const [showSmsCodeModal, setShowSmsCodeModal] =useState(true)


    const handleShowSmsModal = () => setShowSmsCodeModal(true);

    const [phoneClass, setPhoneClass] = useState("form-control")

    function handleCloseSmsModal() {
        setShowChangePhoneModal(false);
        setChangePhone(null)
        setError('')
        setPhoneClass("form-control")
    }

    async function sendVerificationCode() {
        const verificationCode = {phoneNumber, code: smsCodeRef.current.value}
        if (verificationCode.code.length !== 6) return setError('Kodas per trumpas. Bandykite dar kartą.')
        const user = await http.post('/change-phone-number2', verificationCode)
        if (!user.success) return setError(user.message)
        if (user.success) {
            setUser(user.newUserPhone)
            setShowChangePhoneModal(false);
            setChangePhone(null)
            setError('')
            setPhoneClass("form-control")
        }
    }




    return (

        <div
            // show={handleShowSmsModal}
            // onHide={handleCloseSmsModal}
        >
            <Modal.Header closeButton>

                <Modal.Title> Įveskite SMS žinute gautą kodą</Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                        <Form.Label>
                            Kodas išsiųstas tel. numeriu +370{phoneNumber}
                        </Form.Label>

                        <div className="input-group mb-3 inputStyle">
                            <input ref={smsCodeRef}
                                   type="text"
                                   maxLength={6}
                                   onKeyPress={(event) => {
                                       if (!/[0-9]/.test(event.key)) {
                                           event.preventDefault();
                                       }
                                   }}
                                   className={phoneClass}
                                   placeholder="kodas"
                                   aria-describedby="basic-addon1"/>
                        </div>

                        <div style={{color: "red"}}>{error}</div>

                    </Form.Group>
                </Form>

            </Modal.Body>

            <Modal.Footer>
                <Button className='profile-sidebar-btn' onClick={handleCloseSmsModal}
                        closeButton
                >
                    Atšaukti
                </Button>
                <Button className='phone-change-modal-button profile-sidebar-btn'
                        onClick={sendVerificationCode}
                >
                    Patvirtinti
                </Button>

                <div>
                    <p className={message? 'status-message-success' : 'statusMessage'}></p>
                </div>
            </Modal.Footer>


        </div>


    );
};

export default SmsInput;


