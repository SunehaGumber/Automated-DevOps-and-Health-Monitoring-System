import React from 'react'
import { ServerIcon } from '../../common/Icons';
const mockServers = [
  { name: "prod-api-01", url: "api.sentinel.io", status: "up", ms: "98ms" },
  { name: "db-primary", url: "db.sentinel.io", status: "down", ms: "—" },
];

const MockDashboard = () => {
  return (
   <div className="flex justify-center px-8 py-10">
        <div className="bg-[#0e1117] border border-[#1c2130] rounded-2xl overflow-hidden w-full max-w-[520px] animate-[float_4s_ease-in-out_infinite]">
          <div className="h-[2px] bg-blue-700" />
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-bold text-slate-400 tracking-[.1em]">YOUR SERVERS</span>
              <div className="flex items-center gap-1.5 bg-[#071510] border border-[#0f3320] rounded-full px-2.5 py-1">
                <span className="w-[4px] h-[4px] rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] text-emerald-500 tracking-[.1em]">MONITORING ACTIVE</span>
              </div>
            </div>

            {/* Mini stat cards */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: "TOTAL", val: "4", color: "text-blue-500" },
                { label: "ONLINE", val: "3", color: "text-emerald-500" },
                { label: "OFFLINE", val: "1", color: "text-red-500" },
              ].map((s) => (
                <div key={s.label} className="bg-[#080c12] rounded-[8px] px-3 py-2.5">
                  <p className="text-[7.5px] text-slate-600 tracking-widest mb-1">{s.label}</p>
                  <p className={`text-[16px] font-bold font-sans ${s.color}`}>{s.val}</p>
                </div>
              ))}
            </div>

            {/* Mini server rows */}
            <div className="flex flex-col gap-1.5">
              {mockServers.map((s) => (
                <div key={s.name} className="bg-[#080c12] rounded-[8px] px-3 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-[6px] bg-[#0d1829] border border-[#1c2d4a] flex items-center justify-center">
                      <ServerIcon />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 font-sans">{s.name}</p>
                      <p className="text-[8.5px] text-[#263349]">{s.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] font-bold tracking-wider ${s.status === "up" ? "text-emerald-500" : "text-red-500"}`}>
                      {s.status.toUpperCase()}
                    </span>
                    <span className={`text-[11px] font-bold font-sans ${s.status === "up" ? "text-emerald-500" : "text-red-500"}`}>
                      {s.ms}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}

export default MockDashboard