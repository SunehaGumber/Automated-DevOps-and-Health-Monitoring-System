import { useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ShieldIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2563eb"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2563eb"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

const RefreshIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

export default function OtpInput() {
  const inputs = useRef([]);
  const { handleVerifyEmail, user, handleResendOtp } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = val.slice(-1);
    if (val && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);
    pasted.split("").forEach((char, i) => {
      if (inputs.current[i]) inputs.current[i].value = char;
    });
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const submitHandler = async () => {
    try {
      const otpValue = inputs.current.map((input) => input.value).join("");
      if (otpValue.length < 6) {
      }
  
      const result = await handleVerifyEmail({
        email: user.email,
        otp: otpValue,
      });
      if (result) {
        toast.success("Otp verified successfully!")
        navigate('/')
      }
      else {
        toast.error("Invalid otp");
      }
      
    } catch (err) {
      toast.error(err);
    }
  };

  const resetCodeHandler = async () => {
    if (!user?.email) {
      console.error("Sentinel: Operator identity not found for resend.");
      return;
    }

    // 2. Call the hook
    const response = await handleResendOtp({
      email: user.email,
    });
    if (response) {
      toast.success("Otp sent successfully!")
    }
    else {
      toast.error("Too many login attempts")
    }
  };
  return (
    <div className="min-h-screen bg-[#080a0d] flex items-center justify-center px-4 py-10 font-mono">
      <div className="w-full max-w-[380px]">
        {/* Card */}
        <div className="bg-[#0e1117] border border-[#1c2130] rounded-2xl overflow-hidden">
          {/* Top stripe */}
          <div className="h-[3px] bg-blue-700" />

          <div className="p-8">
            {/* Top row */}
            <div className="flex items-start justify-between mb-8">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#0d1829] border border-[#1c2d4a] flex items-center justify-center">
                <ShieldIcon />
              </div>
              <div className="flex items-center gap-1.5 bg-[#071510] border border-[#0f3320] rounded-full px-3 py-1">
                <span className="w-[5px] h-[5px] rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] text-emerald-500 tracking-widest">
                  SYSTEMS NOMINAL
                </span>
              </div>
            </div>

            {/* Mail icon circle */}
            <div className="flex justify-center mb-6">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[#0d1829] border border-[#1c2d4a] flex items-center justify-center">
                <MailIcon />
              </div>
            </div>

            {/* Title */}
            <div className="mb-7 text-center">
              <p className="text-[11px] text-blue-600 tracking-[.18em] mb-1.5">
                SENTINEL PLATFORM
              </p>
              <h1 className="text-[22px] font-bold text-slate-100 leading-tight tracking-tight font-sans">
                Verify <span className="text-blue-500">identity</span>
              </h1>
              <p className="text-[12px] text-slate-600 mt-2 leading-relaxed font-sans">
                Enter the 6-digit code dispatched to{" "}
                <span className="text-slate-400">
                  {user?.email || "your email"}
                </span>
              </p>
            </div>

            {/* OTP inputs */}
            <div className="flex items-center justify-between gap-2 mb-6">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  ref={(el) => (inputs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  onInput={(e) => handleInput(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onPaste={handlePaste}
                  className="w-full aspect-square max-w-[48px] bg-[#080c12] border border-[#1c2130] hover:border-[#263349] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 rounded-[10px] text-center text-[18px] font-bold text-slate-100 font-mono outline-none transition-all caret-blue-500"
                />
              ))}
            </div>

            {/* Timer + resend */}
            <div className="flex items-center justify-between mb-7">
              <div className="flex items-center gap-1.5">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#263349"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-[10px] text-[#263349] tracking-wider">
                  EXPIRES IN 04:32
                </span>
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 text-[10px] text-blue-600 hover:text-blue-400 transition-colors bg-transparent border-none cursor-pointer p-0 tracking-wider"
                onClick={() => {
                  resetCodeHandler();
                }}
              >
                <RefreshIcon />
                RESEND CODE
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-[#1c2130]" />
              <span className="text-[9px] text-[#263349] tracking-[.1em]">
                AUTHENTICATE
              </span>
              <div className="flex-1 h-px bg-[#1c2130]" />
            </div>

            {/* Submit */}
            <button
              type="button"
              className="w-full bg-blue-700 hover:bg-blue-800 active:scale-[.99] text-white rounded-[10px] px-4 py-[11px] text-[11px] font-bold tracking-[.14em] flex items-center justify-center gap-2.5 transition-all cursor-pointer border-none font-mono"
              onClick={(e) => {
                submitHandler();
              }}
            >
              <ArrowRightIcon />
              <span>VERIFY CODE</span>
            </button>
          </div>

          {/* Footer */}
          <div className="px-8 py-3 bg-[#080a0d] border-t border-[#1c2130] flex items-center justify-between">
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

        {/* Back to login */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <div className="flex-1 h-px bg-[#1c2130]" />
          <p className="text-[11px] text-slate-600 font-sans whitespace-nowrap">
            Wrong account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-400 transition-colors no-underline"
            >
              Back to login
            </a>
          </p>
          <div className="flex-1 h-px bg-[#1c2130]" />
        </div>
      </div>
    </div>
  );
}
