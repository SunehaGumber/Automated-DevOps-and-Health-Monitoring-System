import React, { useState } from 'react'
import ProfileForm from '../components/ProfileForm'
import OtpInput from '../components/OTPinput'

const Profile = () => {
    const [step, setStep] = useState("profile");
  
    return (
        <div className='container'>
          {step=== "profile" && <ProfileForm setStep={setStep}/>}
          {step==="otp" && <OtpInput/>}        
        </div>
  )
}

export default Profile