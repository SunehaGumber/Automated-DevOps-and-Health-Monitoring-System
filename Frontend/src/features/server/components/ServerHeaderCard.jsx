import { ServerIcon } from '../../common/Icons';
import {useState,useEffect} from 'react'
const ServerHeaderCard = ({ server, getResponseColor, avgResponse, uptimePct, logs }) => {
  const [displayResponse, setDisplayResponse] = useState(server.responseTime);

useEffect(() => {
  setDisplayResponse(server.responseTime);
}, [server.responseTime]);
  return (
    <div className="bg-[#0e1117] border border-[#1c2130] rounded-2xl p-5">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-[42px] h-[42px] rounded-[11px] bg-[#0d1829] border border-[#1c2d4a] flex items-center justify-center flex-shrink-0">
                <ServerIcon />
              </div>
              <div>
                <h1 className="text-[18px] font-bold text-slate-100 font-sans tracking-tight leading-tight">
                  {server?.name}
                </h1>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {server?.url}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${server?.status === "up" ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}
              />
              <span
                className={`text-[10px] font-bold tracking-widest ${server?.status === "up" ? "text-emerald-500" : "text-red-500"}`}
              >
                {server?.status === "up" ? "LIVE · ONLINE" : "LIVE · OFFLINE"}
              </span>
            </div>
          </div>

          {/* Stat blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            {[
              {
                label: "Current response",
                value: displayResponse ? `${displayResponse}ms` : "—",
                color: getResponseColor(server?.status, displayResponse),
              },
              {
                label: "Avg response",
                value: avgResponse ? `${avgResponse}ms` : "—",
                color: "text-blue-400",
              },
              { label: "Uptime", value: uptimePct, color: "text-emerald-400" },
              {
                label: "Total checks",
                value: logs?.length?.toLocaleString(),
                color: "text-blue-400",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[#080c12] rounded-[10px] px-3.5 py-3"
              >
                <p className="text-[8.5px] text-slate-500 tracking-widest uppercase mb-1.5">
                  {s.label}
                </p>
                <p
                  className={`text-[20px] font-bold font-sans leading-none ${s.color}`}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>

  )
}

export default ServerHeaderCard