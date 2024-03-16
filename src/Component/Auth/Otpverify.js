import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../Slices/userSlice';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const OTPVerification = () => {
    const [otp, setOTP] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const phoneNumber = useSelector(state => state.user.mobileNumber);


    const handleInputChange = (index, value) => {
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

        // Move focus to the next input field if available
        if (value !== '' && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleVerifyOTP = async () => {
        const apiUrl = 'https://staging.fastor.in/v1/pwa/user/login';
        var combinedValue = otp.join('');
        var updated_otp = parseInt(combinedValue);

        const requestData = {
            phone: phoneNumber,
            otp: updated_otp,
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

            if (data.status_code === 200) {

                dispatch(setToken(data.data));
                navigate(`/product`);
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    };

    return (
        <>
            <ArrowBackIosNewIcon style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '999',cursor:"pointer" }}
                fontSize="small" onClick={() => navigate('/')} />

            <div className="container">
                <div className="login-form">
                    <p className='log_header'>OTP Verification</p>
                    <p className='log_desc'>Enter the verification code we just sent on your Mobile Number.</p>
                    <div className="login-inputNbtn">
                        <div className="login-inputNbtn-input">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={value}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    ref={(input) => (inputRefs.current[index] = input)}
                                    style={{ marginRight: "5px", width: '45px', textAlign: 'center' }}
                                />
                            ))}
                        </div>

                        <div className="login-inputNbtn-button">
                            <button onClick={handleVerifyOTP}>Verify</button>
                        </div>

                        <div>
                            <p className='resend-code'>Didn’t receive code? <span>Resend</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OTPVerification;
