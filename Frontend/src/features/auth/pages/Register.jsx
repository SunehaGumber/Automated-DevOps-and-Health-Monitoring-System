import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import OtpInput from "../components/OTPinput";
export default function Register() {
    const [step, setStep] = useState("register");
    return (
        <div>
            {step === "register" && (
                <RegisterForm setStep={setStep} />
            )}
    
            {step === "otp" && (
                <OtpInput navigation={home} />
            )}
        </div>
    );
}