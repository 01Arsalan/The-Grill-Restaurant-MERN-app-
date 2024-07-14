import "@/assets/Styles/login.css"
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toggleUser } from '../../Features/homePageSlice';
import { useNavigate } from "react-router-dom";
import { addPhone, addUser } from "../../Features/userSlice"
import OtpInput from 'react-otp-input'
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { phoneValidationSchema } from "./validation"
import { onSignup, onOTPVerify } from "./utils";


const LoginModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOTP, setIsOTP] = useState(false);
  const [otp, setOtp] = useState();

  const formik = useFormik({
    initialValues: { phone: "" },
    validationSchema: phoneValidationSchema,
    onSubmit: (values) => onSignup(values.phone, setIsOTP)
  });

  const handleOtpVerification = async () => {
    const response = await onOTPVerify(otp, formik.values.phone);
    if (response.exists) {
      changeModalView();
      dispatch(addUser(response.user));
      navigate('/');
    }
    else if (response.setNewUser) {
      changeModalView();
      dispatch(addPhone(formik.values.phone));
      navigate('/login');
    }
  };

  const changeModalView = () => {
    document.body.classList.toggle("modal-open");
    dispatch(toggleUser());
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div><Toaster /></div>
        <div className="header">
          <h2 className="title">{isOTP ? "Verify OTP" : "Continue to Login"}</h2>
          <button className="btn" onClick={changeModalView}><i className="bi bi-x-circle-fill img" width="20px"></i></button>
        </div>
        <hr />
        {isOTP && <p className='note'>Verification Code Has Been Sent To<br />{formik.values.phone}. <a className='wrong-num' onClick={() => setIsOTP(false)}>Wrong Number</a></p>}
        <div className="details">
          <p className="label">{isOTP ? "Please Enter OTP to Verify" : "Enter Mobile Number"}</p>
          {!isOTP ? (
            <div className="input-num">
              <p className="num">+91</p>
              <input
                className="input"
                type="text"
                id="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="error">{formik.errors.phone}</div>
              )}
            </div>
          ) : (
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} className="inp" style={{ width: "8%" }} />}
            />
          )}
          {!isOTP ? (
            <button className="btn" onClick={formik.handleSubmit} >Send OTP</button>
          ) : (
            <button className="btn" onClick={handleOtpVerification}>Continue</button>
          )}
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default LoginModal;
