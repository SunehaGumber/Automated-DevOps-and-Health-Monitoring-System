import React from 'react'

const ServerListHeader = () => {
  return (
     <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-slate-500 tracking-[.14em] uppercase">
            Your servers
          </span>
          <div className="flex gap-1.5">
            {["ALL", "UP", "DOWN"].map((f) => (
              <button
                key={f}
                className={`border rounded-[6px] px-2.5 py-1 text-[9px] cursor-pointer font-mono tracking-wider transition-all
                  ${
                    f === "ALL"
                      ? "bg-[#0d1829] border-blue-600 text-blue-500"
                      : "bg-[#080c12] border-[#1c2130] text-[#263349] hover:border-[#263349]"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
  )
}

export default ServerListHeader