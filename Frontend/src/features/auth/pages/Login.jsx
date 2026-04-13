import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { replace, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ShieldIcon,UserIcon,LockIcon,EyeIcon,EyeOffIcon,LoginIcon } from "../../common/Icons";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false); 
  const { handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await handleLogin({ email, password });
      if (response) {
        toast.success("User logged in successfully!");
        navigate('/dashboard', { replace: true });
      }
      else {
        toast.error("Invalid credentials")
      }
    }
    catch (err) {
      toast.error(err);
    }
    finally {
      setLoading(false);
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
                Secure
                <br />
                <span className="text-blue-500">access</span> portal
              </h1>
              <p className="text-[12px] text-slate-600 mt-2 leading-relaxed font-sans">
                Authenticate to initialize your infrastructure monitoring
                session.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Identifier */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[9.5px] text-slate-500 uppercase tracking-[.14em]">
                    Identifier
                  </span>
                  <span className="text-[9.5px] text-[#1e2d45] tracking-wider">
                    OPERATOR ID
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1e2d45] pointer-events-none">
                    <UserIcon />
                  </span>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@sentinel.io"
                    className="w-full bg-[#080c12] border border-[#1c2130] hover:border-[#263349] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 rounded-[10px] pl-9 pr-3 py-2.5 text-[13px] text-slate-300 placeholder-[#1e2d45] font-mono outline-none transition-all"
                  />
                </div>
              </div>

              {/* Passkey */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[9.5px] text-slate-500 uppercase tracking-[.14em]">
                    Passkey
                  </span>
                  <button
                    type="button"
                    className="text-[9.5px] text-blue-600 hover:text-blue-400 tracking-wider transition-colors bg-transparent border-none cursor-pointer p-0 font-mono"
                  >
                    RESET ACCESS
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1e2d45] pointer-events-none">
                    <LockIcon />
                  </span>
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#080c12] border border-[#1c2130] hover:border-[#263349] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 rounded-[10px] pl-9 pr-10 py-2.5 text-[13px] text-slate-300 placeholder-[#1e2d45] font-mono outline-none transition-all"
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
                  AUTHENTICATE
                </span>
                <div className="flex-1 h-px bg-[#1c2130]" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 active:scale-[.99] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-[10px] px-4 py-[11px] text-[11px] font-bold tracking-[.14em] flex items-center justify-center gap-2.5 transition-all cursor-pointer border-none font-mono"
              >
                {loading ? (
                  <>
                    <span className="w-[13px] h-[13px] rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    <span>AUTHENTICATING</span>
                  </>
                ) : (
                  <>
                    <LoginIcon />
                    <span>SIGN IN</span>
                  </>
                )}
              </button>
            </form>
            <p className="text-sm mt-5 text-center text-[9.5px] text-slate-500 uppercase tracking-[.14em]">
              Don't have an account?{" "}
              <span onClick={() => {
                navigate('/register')
              }} className="text-blue-600 text-[9.5px]  uppercase tracking-[.14em] cursor-pointer">
                Register
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

        {/* Below card */}
        <div className="flex items-center justify-center gap-3 ">
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
