import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import OtpInput from "../components/OTPinput";

export default function Register() {
    const [step, setStep] = useState("register");

    return (
        <div className="auth-container">
            {/* If step is 'register', show the form. 
               We pass setStep so the form can change the step to 'otp' after success.
            */}
            {step === "register" && (
                <RegisterForm setStep={setStep} />
            )}
    

            {/* If step is 'otp', show the OTP input.
               No need to pass props here since OtpInput pulls email from Context!
            */}
            {step === "otp" && (
                <OtpInput />
            )}
        </div>
    );
}