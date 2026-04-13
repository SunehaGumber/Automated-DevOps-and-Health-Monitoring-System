import React from 'react'
import Charts from './Charts'
const ResponseTimeChart = ({chartData}) => {
  return (
    
        <div className="bg-[#0e1117] border border-[#1c2130] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] text-slate-500 tracking-[.14em] uppercase">
              Response time · last 24 checks
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[8.5px] text-[#263349]">&lt;300</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[8.5px] text-[#263349]">300–600ms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-[8.5px] text-[#263349]">&gt;600ms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-[8.5px] text-[#263349]">Down</span>
              </div>
            </div>
          </div>

          {/* Bar chart */}

          <Charts chartData={chartData} />
        </div>

  )
}

export default ResponseTimeChart