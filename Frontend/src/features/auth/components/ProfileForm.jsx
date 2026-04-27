import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Navbar from "../../server/components/Navbar";
import { ShieldIcon,BackIcon,UserIcon,MailIcon,LockIcon,EyeIcon,EyeOffIcon,SaveIcon,KeyIcon,MailSendIcon } from "../../common/Icons";

const Field = ({ label, tag, icon, children }) => (
  <div>
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-[9.5px] text-slate-500 uppercase tracking-[.14em]">
        {label}
      </span>
      {tag && (
        <span className="text-[9px] text-[#1e2d45] tracking-wider">{tag}</span>
      )}
    </div>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1e2d45] pointer-events-none">
        {icon}
      </span>
      {children}
    </div>
  </div>
);

const ProfileForm = ({ setStep }) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user, handleChange, handleForgotPassword } = useAuth();
  const navigate = useNavigate();
  
  const inputClass =
    "w-full bg-[#080c12] border border-[#1c2130] hover:border-[#263349] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 rounded-[10px] pl-9 pr-3 py-2.5 text-[13px] text-slate-300 placeholder-[#1e2d45] font-mono outline-none transition-all";

  const readonlyClass =
    "w-full bg-[#080c12] border border-[#1c2130] rounded-[10px] pl-9 pr-3 py-2.5 text-[13px] text-slate-500 font-mono outline-none cursor-not-allowed select-none";

  const passwordUpdateHandler = async () => {
    const success = await handleChange({
      currentPassword,
      newPassword,
      confirmPassword,
    });
    if (success) {
      toast.success("Password updated successfully!");
    }
  };
   const passwordChangeHandler = async () => {
    setSubmitting(true); 
    try {
      const data = await handleForgotPassword({ email: user.email });
      if (data) {
        toast.success("Otp sent successfully")
        setStep("otp"); 
      }
      else {
        toast.error("Too many login attempts!")
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#080a0d] font-mono">
      <Navbar />

      <div className="max-w-[480px] mx-auto px-4 py-6 flex flex-col gap-4">
        {/* Back */}
        <button onClick={() => {
          navigate('/dashboard')
        }} className="flex items-center gap-2 text-[10px] text-slate-600 hover:text-blue-500 transition-colors bg-transparent border-none cursor-pointer p-0 font-mono tracking-wider w-fit">
          <BackIcon />
          BACK TO DASHBOARD
        </button>

        {/* Page title */}
        <div>
          <p className="text-[11px] text-blue-600 tracking-[.18em] mb-1">
            SENTINEL PLATFORM
          </p>
          <h1 className="text-[22px] font-bold text-slate-100 font-sans tracking-tight leading-tight">
            Profile <span className="text-blue-500">settings</span>
          </h1>
          <p className="text-[12px] text-slate-600 mt-1.5 font-sans leading-relaxed">
            Manage your account identity and security credentials.
          </p>
        </div>

        {/* Account info card */}
        <div className="bg-[#0e1117] border border-[#1c2130] rounded-2xl overflow-hidden">
          <div className="h-[2px] bg-blue-700" />
          <div className="p-6 flex flex-col gap-4">
            {/* Section label */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-slate-500 tracking-[.16em] uppercase">
                Account info
              </span>
              <div className="flex-1 h-px bg-[#1c2130]" />
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-[14px] font-bold text-slate-100 font-sans tracking-tight">
                  {user.username}
                </p>
                <p className="text-[10px] text-slate-600 mt-0.5 tracking-wider">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Username — readonly */}
            <Field label="Username" tag="DISPLAY_ID" icon={<UserIcon />}>
              <input
                type="text"
                value={user.username}
                readOnly
                className={readonlyClass}
              />
            </Field>

            {/* Email — readonly */}
            <Field
              label="Email address"
              tag="AUTH_IDENTIFIER"
              icon={<MailIcon />}
            >
              <input
                type="email"
                value={user.email}
                readOnly
                className={readonlyClass}
              />
            </Field>
          </div>
        </div>

        {/* Change password card */}
        <div className="bg-[#0e1117] border border-[#1c2130] rounded-2xl overflow-hidden">
          <div className="h-[2px] bg-blue-700" />
          <div className="p-6 flex flex-col gap-4">
            {/* Section label */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-slate-500 tracking-[.16em] uppercase">
                Change password
              </span>
              <div className="flex-1 h-px bg-[#1c2130]" />
            </div>

            {/* Current password */}
            <Field label="Current password" tag="REQUIRED" icon={<LockIcon />}>
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="••••••••••••"
                className={`${inputClass} pr-10`}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1e2d45] hover:text-slate-500 transition-colors bg-transparent border-none cursor-pointer flex items-center p-0"
              >
                {showCurrent ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </Field>

            {/* New password */}
            <Field label="New password" tag="MIN 8 CHARS" icon={<KeyIcon />}>
              <input
                type={showNew ? "text" : "password"}
                placeholder="••••••••••••"
                className={`${inputClass} pr-10`}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1e2d45] hover:text-slate-500 transition-colors bg-transparent border-none cursor-pointer flex items-center p-0"
              >
                {showNew ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </Field>

            {/* Confirm new password */}
            <Field label="Confirm new password" icon={<LockIcon />}>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••••••"
                className={`${inputClass} pr-10`}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1e2d45] hover:text-slate-500 transition-colors bg-transparent border-none cursor-pointer flex items-center p-0"
              >
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </Field>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#1c2130]" />
              <span className="text-[9px] text-[#263349] tracking-[.1em]">
                UPDATE
              </span>
              <div className="flex-1 h-px bg-[#1c2130]" />
            </div>

            {/* Save button */}
            <button
              onClick={() => {
                passwordUpdateHandler();
              }}
              type="button"
              className="w-full bg-blue-700 hover:bg-blue-800 active:scale-[.99] text-white rounded-[10px] px-4 py-[11px] text-[11px] font-bold tracking-[.14em] flex items-center justify-center gap-2.5 transition-all cursor-pointer border-none font-mono"
            >
              <SaveIcon />
              SAVE NEW PASSWORD
            </button>
          </div>
        </div>

        {/* Forgot password card */}
        <div className="bg-[#0e1117] border border-[#1c2130] rounded-2xl overflow-hidden">
          <div className="h-[2px] bg-[#1c2130]" />
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-slate-500 tracking-[.16em] uppercase">
                Forgot password
              </span>
              <div className="flex-1 h-px bg-[#1c2130]" />
            </div>

            <p className="text-[12px] text-slate-600 font-sans leading-relaxed">
              Lost access to your password? We'll dispatch a reset link to your
              registered email address.
            </p>

            {/* Email field — prefilled readonly */}
            <Field label="Sending reset link to" icon={<MailIcon />}>
              <input
                type="email"
                value={user.email}
                readOnly
                className={readonlyClass}
              />
            </Field>

            {/* Send reset link button */}
            <button
              onClick={() => {
                passwordChangeHandler();
              }}
              type="button"
              className="w-full bg-transparent hover:bg-[#080c12] active:scale-[.99] text-slate-400 hover:text-slate-200 border border-[#1c2130] hover:border-[#263349] rounded-[10px] px-4 py-[11px] text-[11px] font-bold tracking-[.14em] flex items-center justify-center gap-2.5 transition-all cursor-pointer font-mono"
            >
              <MailSendIcon />
                { submitting?"Submitting....":"SEND RESET LINK"}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-[480px] mx-auto px-4 pb-6">
        <div className="px-5 py-2.5 bg-[#0e1117] border border-[#1c2130] rounded-xl flex items-center justify-between">
          <span className="text-[9.5px] text-[#1e2d45]">
            v4.2.1 · build 20260409
          </span>
          <div className="flex items-center gap-1.5">
            <ShieldIcon />
            <span className="text-[9px] text-blue-600 bg-blue-600/10 border border-blue-600/20 px-2 py-0.5 rounded-full tracking-wider">
              TLS 1.3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
