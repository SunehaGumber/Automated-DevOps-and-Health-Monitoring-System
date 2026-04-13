import React from 'react'
const ShieldIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2563eb"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const Footer = () => {
  return (
       <div className="mx-6 mb-6 px-5 py-2.5 bg-[#0e1117] border border-[#1c2130] rounded-xl flex items-center justify-between">
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
  )
}

export default Footer