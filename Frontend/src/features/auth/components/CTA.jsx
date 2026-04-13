import React from 'react'
import { useNavigate } from 'react-router';
const CTA = () => {
    const navigate = useNavigate();
  return (
    <section className="flex justify-center px-8 py-14">
        <div className="bg-[#0e1117] border border-[#1c2130] rounded-[20px] p-10 w-full max-w-[480px] flex flex-col items-center text-center">
          <p className="text-[10px] text-blue-600 tracking-[.18em] mb-2.5">
            GET STARTED FREE
          </p>
          <h2 className="text-[22px] font-bold text-slate-100 font-sans tracking-tight mb-2.5">
            Start monitoring your <span className="text-blue-500">servers</span>{" "}
            today
          </h2>
          <p className="text-[12px] text-slate-500 font-sans leading-[1.7] mb-7">
            Create an account, add your first server, and get full visibility
            into your infrastructure in under 2 minutes.
          </p>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-700 hover:bg-blue-800 active:scale-[.99] border-none rounded-[10px] px-6 py-3 text-[11px] font-bold text-white cursor-pointer font-mono tracking-[.12em] transition-all"
            >
              CREATE ACCOUNT
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-transparent hover:bg-[#080c12] border border-[#1c2130] hover:border-[#263349] rounded-[10px] px-6 py-3 text-[11px] font-bold text-slate-500 hover:text-slate-300 cursor-pointer font-mono tracking-[.12em] transition-all"
            >
              LOGIN
            </button>
          </div>
        </div>
      </section>
  )
}

export default CTA