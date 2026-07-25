import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import { useService } from "../hooks/useService";
import ServerCard from "../components/ServerCard";
import Footer from "../components/Footer";
import ServerListHeader from "../components/ServerListHeader";
import { Spinner } from "../../auth/components/Spinner";
import { socket } from "../../../socket/socket";
import { RefreshIcon, ServerIcon } from "../../common/Icons";

const getResponseColor = (status, ms) => {
  if (status === "down" || ms === null) return "text-red-500";
  if (ms < 300) return "text-emerald-400";
  if (ms < 600) return "text-amber-400";
  return "text-amber-500";
};

export default function Dashboard() {
  const { handleGetServers, servers, handleRefreshServers } = useService();
  const [loading, setLoading] = useState(false);

  const total = servers?.length;
  useEffect(() => {
    try {
      const getAllServers = async () => {
        await handleGetServers();
      };
      getAllServers();
    } catch (err) {}
  }, []);
  
  useEffect(() => {
    console.log("Socket connected?", socket.connected);

    if (socket.connected) {
      console.log("CONNECTED (instant):", socket.id);
    }

    socket.on("connect", () => {
      console.log("CONNECTED (event):", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("DISCONNECTED");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  const refreshServersHandler = async () => {
    try {
      setLoading(true);
      await handleRefreshServers();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="min-h-screen bg-[#080a0d] font-mono">
      {/* Navbar */}
      <Navbar />

      <div className="px-6 py-6">
        {/* Page header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-[11px] text-blue-600 tracking-[.16em] mb-1">
              SENTINEL PLATFORM
            </p>
            <h1 className="text-[20px] font-bold text-slate-100 font-sans tracking-tight">
              Your <span className="text-blue-500">servers</span>
            </h1>
            <p className="text-[11px] text-slate-600 mt-1 font-sans">
              Monitoring {total} server{total !== 1 ? "s" : ""} · checks every 2
              minutes
            </p>
          </div>
          <div className="flex flex-end flex-col justify-end">
            <button
              onClick={() => {
                refreshServersHandler();
              }}
              className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 active:scale-[.99] text-white border-none rounded-[8px] px-3 py-1.5 text-[10px] font-bold tracking-widest cursor-pointer transition-all font-mono"
            >
              <RefreshIcon />
              Refresh Servers
            </button>
            <span className="text-[9.5px] text-[#263349] tracking-wider">
              LAST CHECK: 1 min ago
            </span>
          </div>
        </div>

        {/* Stat cards */}
        <StatsCard data={servers} />

        {/* Servers list header */}
        <ServerListHeader />

        {/* Server cards grid */}
        {servers?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-[#0e1117] border border-dashed border-[#1c2130] rounded-2xl gap-3">
            <div className="w-11 h-11 rounded-[12px] bg-[#0d1829] border border-[#1c2d4a] flex items-center justify-center">
              <ServerIcon />
            </div>
            <p className="text-[13px] text-slate-500 font-sans">
              No servers added yet
            </p>
            <p className="text-[11px] text-[#263349] font-sans">
              Click ADD SERVER to register your first node
            </p>
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 ">
            {servers?.map((server) => (
              <ServerCard
                key={server._id}
                server={server}
                getResponseColor={getResponseColor}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
