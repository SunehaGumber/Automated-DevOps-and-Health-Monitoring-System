import React from 'react'

const StatsCard = ({ data }) => {
    const total = data?.length;
  const online = data?.filter((s) => s.status === "up").length;
  const offline = data?.filter((s) => s.status === "down").length;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div className="bg-[#0e1117] border border-[#1c2130] rounded-xl px-4 py-3.5">
            <p className="text-[9px] text-slate-500 tracking-widest uppercase mb-1.5">Total servers</p>
            <p className="text-[22px] font-bold text-blue-500 font-sans leading-none">{total}</p>
            <p className="text-[9px] text-[#263349] tracking-wider mt-1.5">REGISTERED NODES</p>
          </div>
          <div className="bg-[#0e1117] border border-[#1c2130] rounded-xl px-4 py-3.5">
            <p className="text-[9px] text-slate-500 tracking-widest uppercase mb-1.5">Online</p>
            <p className="text-[22px] font-bold text-emerald-500 font-sans leading-none">{online}</p>
            <p className="text-[9px] text-[#263349] tracking-wider mt-1.5">RESPONDING NORMALLY</p>
          </div>
          <div className="bg-[#0e1117] border border-[#1c2130] rounded-xl px-4 py-3.5">
            <p className="text-[9px] text-slate-500 tracking-widest uppercase mb-1.5">Offline</p>
            <p className="text-[22px] font-bold text-red-500 font-sans leading-none">{offline}</p>
            <p className="text-[9px] text-[#263349] tracking-wider mt-1.5">NOT RESPONDING</p>
          </div>
        </div>
  )
}

export default StatsCard