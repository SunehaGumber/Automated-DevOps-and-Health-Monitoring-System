import { useState } from "react";
import { useService } from "../hooks/useService";
import {  useNavigate } from "react-router";
import { ShieldIcon,ServerIcon,TypeIcon,LinkIcon,PlusIcon } from "../../common/Icons";

export default function ServerForm() {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const navigate = useNavigate();

    const { handleCreateServer } = useService();

    const submitHandler =async  (e) => {
        e.preventDefault();
        console.log("Server", name, url);

        await handleCreateServer({
            name,url
        })

        navigate('/dashboard');
        
    }
  return (
    <div className="min-h-screen bg-[#080a0d] flex items-center justify-center px-4 py-10 font-mono">
      <div className="w-full max-w-[380px]">

        {/* Card */}
        <div className="bg-[#0e1117] border border-[#1c2130] rounded-2xl overflow-hidden">

          {/* Top stripe */}
          <div className="h-[3px] bg-blue-700" />

          <div className="p-8">

            {/* Top row */}
            <div className="flex items-start justify-between mb-8">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#0d1829] border border-[#1c2d4a] flex items-center justify-center">
                <ShieldIcon />
              </div>
              <div className="flex items-center gap-1.5 bg-[#071510] border border-[#0f3320] rounded-full px-3 py-1">
                <span className="w-[5px] h-[5px] rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] text-emerald-500 tracking-widest">SYSTEMS NOMINAL</span>
              </div>
            </div>

            {/* Server icon */}
            <div className="flex justify-center mb-6">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[#0d1829] border border-[#1c2d4a] flex items-center justify-center">
                <ServerIcon />
              </div>
            </div>

            {/* Title */}
            <div className="mb-7 text-center">
              <p className="text-[11px] text-blue-600 tracking-[.18em] mb-1.5">SENTINEL PLATFORM</p>
              <h1 className="text-[22px] font-bold text-slate-100 leading-tight tracking-tight font-sans">
                Register <span className="text-blue-500">server</span>
              </h1>
              <p className="text-[12px] text-slate-600 mt-2 leading-relaxed font-sans">
                Add a new node to the infrastructure monitoring network.
              </p>
            </div>

                      <form className="flex flex-col gap-4" onSubmit={(e) => {
                          submitHandler(e)
            }}>

              {/* Server name */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[9.5px] text-slate-500 uppercase tracking-[.14em]">Server name</span>
                  <span className="text-[9px] text-[#1e2d45] tracking-wider">NODE_ID</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1e2d45] pointer-events-none">
                    <TypeIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="prod-server-01"
                    className="w-full bg-[#080c12] border border-[#1c2130] hover:border-[#263349] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 rounded-[10px] pl-9 pr-3 py-2.5 text-[13px] text-slate-300 placeholder-[#1e2d45] font-mono outline-none transition-all"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                  />
                </div>
              </div>

              {/* Server URL */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[9.5px] text-slate-500 uppercase tracking-[.14em]">Server URL</span>
                  <span className="text-[9px] text-[#1e2d45] tracking-wider">ENDPOINT</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1e2d45] pointer-events-none">
                    <LinkIcon />
                  </span>
                  <input
                    type="url"
                    placeholder="https://192.168.1.1:8080"
                    className="w-full bg-[#080c12] border border-[#1c2130] hover:border-[#263349] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 rounded-[10px] pl-9 pr-3 py-2.5 text-[13px] text-slate-300 placeholder-[#1e2d45] font-mono outline-none transition-all"
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value)
                    }}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-[#1c2130]" />
                <span className="text-[9px] text-[#263349] tracking-[.1em]">PROVISION NODE</span>
                <div className="flex-1 h-px bg-[#1c2130]" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 active:scale-[.99] text-white rounded-[10px] px-4 py-[11px] text-[11px] font-bold tracking-[.14em] flex items-center justify-center gap-2.5 transition-all cursor-pointer border-none font-mono"
              >
                <PlusIcon />
                <span>ADD SERVER</span>
              </button>

            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-3 bg-[#080a0d] border-t border-[#1c2130] flex items-center justify-between">
            <span className="text-[9.5px] text-[#1e2d45]">v4.2.1 · build 20260409</span>
            <div className="flex items-center gap-1.5">
              <ShieldIcon />
              <span className="text-[9px] text-blue-600 bg-blue-600/10 border border-blue-600/20 px-2 py-0.5 rounded-full tracking-wider">TLS 1.3</span>
            </div>
          </div>

        </div>

        {/* Back link */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <div className="flex-1 h-px bg-[#1c2130]" />
          <p className="text-[11px] text-slate-600 font-sans whitespace-nowrap">
            Changed your mind?{" "}
            <a href="/dashboard" className="text-blue-600 hover:text-blue-400 transition-colors no-underline">
              Back to dashboard
            </a>
          </p>
          <div className="flex-1 h-px bg-[#1c2130]" />
        </div>

      </div>
    </div>
  );
}