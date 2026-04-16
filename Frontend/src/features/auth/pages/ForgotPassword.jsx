import { useState, useEffect } from "react"; // Added useEffect
import {
  ShieldIcon,
  LockIcon,
  KeyIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon,
} from "../../common/Icons";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from 'react-router';

export default function ForgotPassword() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const { handleChangePassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. Retrieve the token passed from the OTP component via navigate state
  const resetToken = location.state?.token;

  // 2. Security Guard: Kick them out if they don't have a token
  useEffect(() => {
    if (!resetToken) {
      toast.error("Session expired. Please verify your OTP again.");
      navigate("/login"); 
    }
  }, [resetToken, navigate]);

  const inputClass =
    "w-full bg-[#080c12] border border-[#1c2130] hover:border-[#263349] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 rounded-[10px] pl-9 pr-10 py-2.5 text-[13px] text-slate-300 placeholder-[#1e2d45] font-mono outline-none transition-all";

  const updatePasswordHandler = async (e) => {
    e.preventDefault(); // Stop page reload

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

      try {
          console.log(resetToken);
      const data = await handleChangePassword(
        { password, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${resetToken}`,
          },
        }
      );

      if (data) {
        toast.success("Password updated! You can now log in.");
        navigate("/login"); 
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to update password";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0d] flex items-center justify-center px-4 py-10 font-mono">
      <div className="w-full max-w-[380px]">
        <div className="bg-[#0e1117] border border-[#1c2130] rounded-2xl overflow-hidden">
          <div className="h-[3px] bg-blue-700" />

          <div className="p-8">
            <div className="flex items-start justify-between mb-8">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#0d1829] border border-[#1c2d4a] flex items-center justify-center">
                <ShieldIcon size={18} />
              </div>
              <div className="flex items-center gap-1.5 bg-[#071510] border border-[#0f3320] rounded-full px-3 py-1">
                <span className="w-[5px] h-[5px] rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] text-emerald-500 tracking-widest uppercase">
                  Systems Nominal
                </span>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[#0d1829] border border-[#1c2d4a] flex items-center justify-center">
                <KeyIcon size={22} color="#2563eb" />
              </div>
            </div>

            <div className="mb-7 text-center">
              <p className="text-[11px] text-blue-600 tracking-[.18em] mb-1.5">SENTINEL PLATFORM</p>
              <h1 className="text-[22px] font-bold text-slate-100 leading-tight tracking-tight font-sans">
                Reset <span className="text-blue-500">passkey</span>
              </h1>
              <p className="text-[12px] text-slate-600 mt-2 leading-relaxed font-sans">
                Set a new password for your account. Make sure it's at least 6 characters.
              </p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={updatePasswordHandler}>
              {/* New password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[9.5px] text-slate-500 uppercase tracking-[.14em]">New password</span>
                  <span className="text-[9px] text-[#1e2d45] tracking-wider">MIN 6 CHARS</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1e2d45] pointer-events-none">
                    <LockIcon size={13} />
                  </span>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••••••"
                    className={inputClass}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1e2d45] hover:text-slate-500 transition-colors bg-transparent border-none cursor-pointer flex items-center p-0"
                  >
                    {showPass ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[9.5px] text-slate-500 uppercase tracking-[.14em]">Confirm password</span>
                  <span className="text-[9px] text-[#1e2d45] tracking-wider">MUST MATCH</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1e2d45] pointer-events-none">
                    <LockIcon size={13} />
                  </span>
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••••••"
                    className={inputClass}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1e2d45] hover:text-slate-500 transition-colors bg-transparent border-none cursor-pointer flex items-center p-0"
                  >
                    {showConfirm ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-[#1c2130]" />
                <span className="text-[9px] text-[#263349] tracking-[.1em]">RESET</span>
                <div className="flex-1 h-px bg-[#1c2130]" />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 active:scale-[.99] text-white rounded-[10px] px-4 py-[11px] text-[11px] font-bold tracking-[.14em] flex items-center justify-center gap-2.5 transition-all cursor-pointer border-none font-mono"
              >
                <ArrowRightIcon size={14} />
                <span>UPDATE CREDENTIALS</span>
              </button>
            </form>
          </div>

          <div className="px-8 py-3 bg-[#080a0d] border-t border-[#1c2130] flex items-center justify-between">
            <span className="text-[9.5px] text-[#1e2d45]">v4.2.1 · build 20260409</span>
            <div className="flex items-center gap-1.5">
              <ShieldIcon size={12} />
              <span className="text-[9px] text-blue-600 bg-blue-600/10 border border-blue-600/20 px-2 py-0.5 rounded-full tracking-wider">
                TLS 1.3
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-5">
          <div className="flex-1 h-px bg-[#1c2130]" />
          <p className="text-[11px] text-slate-600 font-sans whitespace-nowrap">
            Remembered it?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-400 no-underline transition-colors">
              Back to login
            </a>
          </p>
          <div className="flex-1 h-px bg-[#1c2130]" />
        </div>
      </div>
    </div>
  );
}