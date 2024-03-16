import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './auth.css';
import { setMobileNumber } from '../Slices/userSlice';

const Register = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [btnDisable, setBtnDisable] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogin = async () => {
        if (phoneNumber === '') {
            alert('Enter the phone number')
            setBtnDisable(true)

        }

        const apiUrl = 'https://staging.fastor.in/v1/pwa/user/register';
        const requestData = {
            phone: phoneNumber,
            dial_code: '+91'
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            const data = await response.json();
            console.log('Response:', data);
            if (data.status_code === 200) {
                dispatch(setMobileNumber(phoneNumber));
                navigate(`/verify-otp`);

            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }

    };

    return (
        <div className="container">
            <div className="login-form">
                <p className='log_header'>Enter Your Mobile Number</p>
                <p className='log_desc'>We will send you the 6 digit verification conde</p>
                <div className="login-inputNbtn">
                    <div className="login-inputNbtn-input">
                        <input
                            type="text"
                            placeholder="Enter mobile number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <div className="login-inputNbtn-button">
                        {btnDisable ? <button disabled>Send Code</button> : <button onClick={handleLogin}>Send Code</button>}
                    </div>

                </div>

            </div>
        </div>

    );
};

export default Register;
