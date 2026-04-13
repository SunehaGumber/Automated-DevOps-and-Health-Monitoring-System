import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  ShieldIcon,
  PlusIcon,
  UserIcon,
  LogoutIcon,
  LogoutAllIcon,
  ServerIcon,
} from "../../common/Icons";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, handleLogout, handleLogoutAll } = useAuth();
  const [profile, setProfile] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutHandler = async () => {
    const response = await handleLogout();
    if (response) {
      toast.success("user logged out successfully");
    }
  };

  const logoutHandlerAll = async () => {
    const response = await handleLogoutAll();
    if (response) {
      toast.success("user logged out successfully from all devices.");
    } 
  };
  const initials = () => {
    if (!user) return "";
    return user.username
      .split(/[\s_]+/) 
      .map((w) => w[0]) 
      .join("") 
      .toUpperCase()
      .slice(0, 2); 
  };
  let initial = initials();
  return (
    <div className="flex flex-col relative font-mono">
      <nav className="bg-[#0e1117] border-b border-[#1c2130] px-6 h-[52px] flex py-8 items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-[30px] h-[30px] rounded-[8px] bg-[#0d1829] border border-[#1c2d4a] flex items-center justify-center">
            <ShieldIcon />
          </div>
          <div>
            <p className="text-[13px] font-bold text-slate-100 tracking-[.1em]">
              SENTINEL
            </p>
            <p className="text-[9px] text-slate-600 tracking-widest">
              Ops · Health · Monitor
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {!user && (
            <button
              onClick={() => navigate("/login")}
              className="bg-transparent border border-[#1c2130] hover:border-[#263349] hover:text-slate-300 rounded-[8px] px-3.5 py-1.5 text-[10px] font-bold text-slate-500 cursor-pointer font-mono tracking-widest transition-all"
            >
              LOGIN
            </button>
          )}
          {!user && (
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-700 hover:bg-blue-800 active:scale-[.99] border-none rounded-[8px] px-3.5 py-1.5 text-[10px] font-bold text-white cursor-pointer font-mono tracking-widest transition-all"
            >
              GET STARTED
            </button>
          )}

          {user && (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-transparent border border-[#1c2130] hover:border-[#263349] hover:text-slate-300 rounded-[8px] px-3.5 py-1.5 text-[10px] font-bold text-slate-500 cursor-pointer font-mono tracking-widest transition-all"
            >
              Dashboard
            </button>
          )}

          {/* Avatar */}
          {user && (
            <div ref={dropdownRef} className="relative">
              <div
                onClick={() => setProfile(!profile)}
                className={`w-[28px] h-[28px] cursor-pointer rounded-full border flex items-center justify-center text-[10px] font-bold text-blue-500 transition-all
                ${
                  profile
                    ? "bg-[#0d1829] border-blue-600 ring-2 ring-blue-600/20"
                    : "bg-[#0d1829] border-[#1c2d4a] hover:border-blue-600/50"
                }`}
              >
                {initial}
              </div>

              {/* Dropdown */}
              {profile && (
                <div className="absolute right-0 top-[38px] w-[220px] bg-[#0e1117] border border-[#1c2130] rounded-[14px] overflow-hidden z-50">
                  {/* Profile header */}
                  <div className="px-4 py-3.5 border-b border-[#1c2130]">
                    <div className="flex items-center gap-3">
                      <div className="w-[34px] h-[34px] rounded-full bg-[#0d1829] border border-[#1c2d4a] flex items-center justify-center text-[11px] font-bold text-blue-500 flex-shrink-0">
                        {initial}
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-slate-200 font-sans tracking-tight">
                          {user.username}
                        </p>
                        <p className="text-[9.5px] text-slate-600 tracking-wider">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="p-1.5 flex flex-col gap-0.5">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setProfile(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[9px] text-[11px] text-slate-400 hover:bg-[#080c12] hover:text-slate-200 transition-all cursor-pointer bg-transparent border-none text-left font-mono tracking-wide"
                    >
                      <span className="text-[#263349]">
                        <UserIcon />
                      </span>
                      Profile settings
                    </button>

                    <button
                      onClick={() => {
                        navigate("/createServer");
                        setProfile(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[9px] text-[11px] text-slate-400 hover:bg-[#080c12] hover:text-slate-200 transition-all cursor-pointer bg-transparent border-none text-left font-mono tracking-wide"
                    >
                      <span className="text-[#263349]">
                        <ServerIcon />
                      </span>
                      Add server
                    </button>

                    {/* Divider */}
                    <div className="h-px bg-[#1c2130] my-1 mx-2" />

                    <button
                      onClick={() => {
                        logoutHandler();
                        setProfile(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[9px] text-[11px] text-slate-400 hover:bg-[#1a0d0d] hover:text-red-400 transition-all cursor-pointer bg-transparent border-none text-left font-mono tracking-wide group"
                    >
                      <span className="text-[#263349] group-hover:text-red-500">
                        <LogoutIcon />
                      </span>
                      Logout
                    </button>

                    <button
                      onClick={() => {
                        logoutHandlerAll();
                        setProfile(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[9px] text-[11px] text-slate-400 hover:bg-[#1a0d0d] hover:text-red-400 transition-all cursor-pointer bg-transparent border-none text-left font-mono tracking-wide group"
                    >
                      <span className="text-[#263349] group-hover:text-red-500">
                        <LogoutAllIcon />
                      </span>
                      Logout all devices
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-2 border-t border-[#1c2130]">
                    <p className="text-[8.5px] text-[#1e2d45] tracking-wider">
                      v4.2.1 · TLS 1.3 · SENTINEL OPS
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
