import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../Utils/firebase.config";
import { toast } from "react-hot-toast";
import axios from "axios";

export function onCaptchaVerify() {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => { },
        "expired-callback": () => { },
      }
    );
  }
}

export function onSignup(phone, setIsOTP) {
  setIsOTP(true);
  onCaptchaVerify();
  const appVerifier = window.recaptchaVerifier;
  const formatPh = "+91" + phone;
  signInWithPhoneNumber(auth, formatPh, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      toast.success("OTP Sent!");
    })
    .catch((error) => {
      console.log(error);
    });
}


export async function onOTPVerify(otp, phone) {
  try {
    // Check if OTP is provided
    if (!otp) {
      toast.error("OTP is required!");
      return { exists: false, user: null };
    }

    // Verify OTP
    let OTPConfirmationResult;
    try {
      OTPConfirmationResult = await window.confirmationResult.confirm(otp);
    } catch (error) {
      toast.error("Wrong OTP!");
      return { exists: false, user: null };
    }

    // Check if OTP is valid
    if (!OTPConfirmationResult) {
      toast.error("OTP verification failed!");
      return { exists: false, user: null };
    }

    // Check if user exists
    let response;
    try {
      response = await axios.post('/api/user/isuser', { phone });
    } catch (error) {
      console.error('Error checking user existence:', error);
      return { exists: false, user: null };
    }

    // Return the appropriate response
    if (response.data.exists) {
      return { exists: true, user: response.data.user };
    } else {
      return { exists: false, setNewUser: true };
    }

  } catch (err) {
    console.error('Error in OTP verification:', err);
    return { exists: false, user: null };
  }
}
