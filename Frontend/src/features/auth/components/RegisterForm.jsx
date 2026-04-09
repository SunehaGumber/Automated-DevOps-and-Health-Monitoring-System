import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
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

const UserIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
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

export default function RegisterForm({ step, setStep }) {
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { handleRegister } = useAuth();
    
  const submitHandler = async (e) => {
    e.preventDefault();
    const isSuccess = await handleRegister({ email, username, password });

  // 2. Only change step if we have a success signal
  if (isSuccess) {
    setStep("otp"); 
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

            {/* Title */}
            <div className="mb-7">
              <p className="text-[11px] text-blue-600 tracking-[.18em] mb-1.5">
                SENTINEL PLATFORM
              </p>
              <h1 className="text-[22px] font-bold text-slate-100 leading-tight tracking-tight font-sans">
                Create
                <br />
                <span className="text-blue-500">operator</span> account
              </h1>
              <p className="text-[12px] text-slate-600 mt-2 leading-relaxed font-sans">
                Register to gain access to the infrastructure monitoring suite.
              </p>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              {/* Username */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[9.5px] text-slate-500 uppercase tracking-[.14em]">
                    Username
                  </span>
                  <span className="text-[9px] text-[#1e2d45] tracking-wider">
                    OPERATOR ID
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1e2d45] pointer-events-none">
                    <UserIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="john_operator"
                    className="w-full bg-[#080c12] border border-[#1c2130] hover:border-[#263349] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 rounded-[10px] pl-9 pr-3 py-2.5 text-[13px] text-slate-300 placeholder-[#1e2d45] font-mono outline-none transition-all"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[9.5px] text-slate-500 uppercase tracking-[.14em]">
                    Email address
                  </span>
                  <span className="text-[9px] text-[#1e2d45] tracking-wider">
                    AUTH_IDENTIFIER
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1e2d45] pointer-events-none">
                    <MailIcon />
                  </span>
                  <input
                    type="email"
                    placeholder="operator@sentinel.io"
                    className="w-full bg-[#080c12] border border-[#1c2130] hover:border-[#263349] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 rounded-[10px] pl-9 pr-3 py-2.5 text-[13px] text-slate-300 placeholder-[#1e2d45] font-mono outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[9.5px] text-slate-500 uppercase tracking-[.14em]">
                    Password
                  </span>
                  <span className="text-[9px] text-[#1e2d45] tracking-wider">
                    PASSKEY
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1e2d45] pointer-events-none">
                    <LockIcon />
                  </span>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••••••"
                    className="w-full bg-[#080c12] border border-[#1c2130] hover:border-[#263349] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 rounded-[10px] pl-9 pr-10 py-2.5 text-[13px] text-slate-300 placeholder-[#1e2d45] font-mono outline-none transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1e2d45] hover:text-slate-500 transition-colors bg-transparent border-none cursor-pointer flex items-center p-0"
                  >
                    {showPass ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-[#1c2130]" />
                <span className="text-[9px] text-[#263349] tracking-[.1em]">
                  PROVISION
                </span>
                <div className="flex-1 h-px bg-[#1c2130]" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 active:scale-[.99] text-white rounded-[10px] px-4 py-[11px] text-[11px] font-bold tracking-[.14em] flex items-center justify-center gap-2.5 transition-all cursor-pointer border-none font-mono"
              >
                <ArrowRightIcon />
                <span>CREATE ACCOUNT</span>
              </button>
            </form>

            <p className="text-sm mt-5 text-center text-[9.5px] text-slate-500 uppercase tracking-[.14em]">
              Alreadyhave an account?{" "}
              <span className="text-blue-600 text-[9.5px]  uppercase tracking-[.14em] cursor-pointer">
                Login
              </span>
            </p>
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

        <div className="flex items-center justify-center gap-3 mt-5">
          <div className="flex-1 max-w-[60px] h-px bg-[#1c2130]" />
          <span className="text-[9px] text-[#1e2d45] tracking-[.12em]">
            RESTRICTED ACCESS · SENTINEL OPS
          </span>
          <div className="flex-1 max-w-[60px] h-px bg-[#1c2130]" />
        </div>
      </div>
    </div>
  );
}
