import React from 'react'

const LogTable = ({logs,formatUTC,getResponseColor}) => {
  return (
    <div className="bg-[#0e1117] border border-[#1c2130] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] text-slate-500 tracking-[.14em] uppercase">
              Check log
            </span>
            <span className="text-[9px] text-[#263349] tracking-wider">
              {logs?.length} ENTRIES
            </span>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-3 gap-3 px-3 py-2 mb-1">
            <span className="text-[9px] text-[#263349] tracking-widest uppercase">
              Timestamp
            </span>
            <span className="text-[9px] text-[#263349] tracking-widest uppercase">
              Status
            </span>
            <span className="text-[9px] text-[#263349] tracking-widest uppercase text-right">
              Response
            </span>
          </div>

          <div className="flex flex-col gap-1.5 max-h-[280px] overflow-y-auto pr-1">
            {logs?.map((log) => (
              <div
                key={log?._id}
                className="grid grid-cols-3 gap-3 items-center bg-[#080c12] rounded-[9px] px-3 py-2.5 border border-transparent hover:border-[#1c2130] transition-all"
              >
                <span className="text-[10.5px] text-slate-400">
                  {formatUTC(log?.lastChecked)}
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${log?.status === "up" ? "bg-emerald-500" : "bg-red-500"}`}
                  />
                  <span
                    className={`text-[10px] font-bold tracking-wider ${log?.status === "up" ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {log?.status?.toUpperCase()}
                  </span>
                </div>
                <span
                  className={`text-[10.5px] font-bold text-right font-sans ${getResponseColor(log?.status, log?.responseTime)}`}
                >
                  {log?.responseTime ? `${log?.responseTime}ms` : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
  )
}

export default LogTable