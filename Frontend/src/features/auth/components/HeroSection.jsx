import { useNavigate } from "react-router";
import { LoginIcon } from "../../common/Icons";


const HeroSection = () => {
    const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center text-center px-8 pt-[72px] pb-16">

        {/* Live badge */}
        <div className="flex items-center gap-2 bg-[#071510] border border-[#0f3320] rounded-full px-4 py-1.5 mb-7">
          <span className="w-[5px] h-[5px] rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9.5px] text-emerald-500 tracking-[.12em]">LIVE INFRASTRUCTURE MONITORING</span>
        </div>

        {/* Headline */}
        <h1 className="text-[36px] font-extrabold text-slate-100 font-sans leading-[1.15] tracking-tight max-w-[560px] mb-4">
          Know when your{" "}
          <span className="text-blue-500">servers go down</span>{" "}
          before your users do
        </h1>

        <p className="text-[13px] text-slate-500 font-sans leading-[1.75] max-w-[420px] mb-9">
          Sentinel monitors your servers every 2 minutes, tracks response times, and gives you a full history of your infrastructure health — all in one place.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center gap-3 mb-12">
          <button
            onClick={() => navigate("/register")}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 active:scale-[.99] border-none rounded-[10px] px-6 py-3 text-[11px] font-bold text-white cursor-pointer font-mono tracking-[.12em] transition-all"
          >
            <LoginIcon />
            START MONITORING
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-transparent hover:bg-[#0e1117] border border-[#1c2130] hover:border-[#263349] rounded-[10px] px-6 py-3 text-[11px] font-bold text-slate-500 hover:text-slate-300 cursor-pointer font-mono tracking-[.12em] transition-all"
          >
            LOGIN
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-10">
          {[
            { num: "2 min", label: "CHECK INTERVAL" },
            { num: "99.9%", label: "PLATFORM UPTIME" },
            { num: "instant", label: "INCIDENT DETECTION" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-[20px] font-bold text-slate-100 font-sans tracking-tight">{s.num}</span>
              <span className="text-[9px] text-slate-600 tracking-[.12em]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
  )
}

export default HeroSection