import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useService } from "../hooks/useService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LogTable from "../components/LogTable";
import ServerHeaderCard from "../components/ServerHeaderCard";
import ResponseTimeChart from "../components/ResponseTimeChart";
import { Spinner } from "../../auth/components/Spinner";
import { BackIcon } from "../../common/Icons";
import IncidentsSection from "../../incidents/components/IncidentsSection";

const formatUTC = (iso) => {
  if (!iso) return "-";

  const d = new Date(iso);

  return `${d.toLocaleDateString()} · ${d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};
const formatTime = (iso) => {
  if (!iso) return "-";

  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getAvgResponse = (logs) => {
  const valid = logs?.filter((l) => l.responseTime > 0);
  if (!valid?.length) return null;
  return Math.round(
    valid.reduce((sum, l) => sum + l.responseTime, 0) / valid.length,
  );
};

const getUptimePct = (logs) => {
  if (!logs?.length) return "—";
  const up = logs?.filter((l) => l.status === "up").length;
  return ((up / logs?.length) * 100).toFixed(2) + "%";
};

const getBarColor = (status, ms) => {
  if (status === "down" || ms === null) return "000";
  if (ms < 300) return "#10b981";
  if (ms < 600) return "#3b82f6";
  return "#f59e0b";
};

const getResponseColor = (status, ms) => {
  if (status === "down" || ms === null) return "text-red-500";
  if (ms < 300) return "text-emerald-400";
  if (ms < 600) return "text-blue-400";
  return "text-amber-400";
};

export default function ServerDetail() {
  const { id } = useParams();
  const { server, handleFetchServer, handleGetLogs, logs, loading } = useService();
  useEffect(() => {
    const initPage = async () => {
      if (id) {
        await handleFetchServer({ id });
        await handleGetLogs({ id });
      }
    };
    initPage();
  }, [id]);
  
  const avgResponse = getAvgResponse(logs);
  const navigate = useNavigate();
  const uptimePct = getUptimePct(logs);
const filteredLogs = Array.isArray(logs)
  ? logs.filter(l => String(l.server) === String(id))
  : [];
  const chartData = [...(filteredLogs || [])]
    .reverse()
    .slice(-24)
    .map((log) => ({
      name: formatTime(log.lastChecked),
      responseTime: log.status === "down" ? 1:log.responseTime,
      status: log.status,
      originalTime: formatUTC(log.lastChecked),
      fill: log.status === "down" ? "#ef4444" : getBarColor(log.status, log.responseTime),
    }));

  if (loading || !server) {
    return (
     <Spinner/>
    );
  }

  return (
    <div className="min-h-screen bg-[#080a0d] font-mono">
      {/* Navbar */}
      <Navbar />

      <div className="px-6 py-6 flex flex-col gap-4">
        {/* Back */}
        <button
          onClick={() => {
            navigate("/dashboard");
          }}
          className="flex items-center gap-2 text-[10px] text-slate-600 hover:text-blue-500 transition-colors bg-transparent border-none cursor-pointer p-0 font-mono tracking-wider w-fit"
        >
          <BackIcon />
          BACK TO DASHBOARD
        </button>

        {/* Server header card */}
        <ServerHeaderCard
          server={server}
          getResponseColor={getResponseColor}
          avgResponse={avgResponse}
          uptimePct={uptimePct}
          logs={logs}
        />
        {/* Response time chart */}
        <ResponseTimeChart chartData={chartData} />
        <IncidentsSection id={id} />
        {/* Log table */}
        <LogTable
          logs={filteredLogs}
          formatUTC={formatUTC}
          getResponseColor={getResponseColor}
        />
      </div>

      {/* Footer */}
          <Footer />
          
    </div>
  );
}
