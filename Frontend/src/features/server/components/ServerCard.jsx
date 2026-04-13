import { useNavigate } from "react-router";
import { useService } from "../hooks/useService";
const ServerIcon = () => (
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
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const formatLastChecked = (iso) => {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  return `${Math.floor(diff / 3600)}h ago`;
};
const ArrowRightIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const RefreshIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 4v6h-6" />
    {/* Fixed line below: changed h(6 to h6 */}
    <path d="M1 20v-6h6" /> 
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);
const formatUTC = (iso) => {
  const d = new Date(iso);
  return `${d.toISOString().slice(0, 10)} · ${d.toISOString().slice(11, 16)} UTC`;
};

const ServerCard = ({ server, getResponseColor }) => {
  const navigate = useNavigate();
  const { handleCheckServer } = useService();
  const refreshParticularServer = async ({ id }) => {
    await handleCheckServer({ id });
  };
  return (
    <div className="bg-[#0e1117] border border-[#1c2130] hover:border-[#263349] rounded-2xl p-4 cursor-pointer transition-all w-full">
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-[9px] bg-[#0d1829] border border-[#1c2d4a] flex items-center justify-center flex-shrink-0">
          <ServerIcon />
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${server.status === "up" ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}
          />
          <span
            className={`text-[9px] font-bold tracking-widest ${server.status === "up" ? "text-emerald-500" : "text-red-500"}`}
          >
            {server?.status?.toUpperCase()}
          </span>
        </div>
      </div>

      <p className="text-[14px] font-bold text-slate-100 font-sans tracking-tight mb-1">
        {server?.name}
      </p>
      <p className="text-[10px] text-slate-600 mb-3 truncate">{server?.url}</p>

      <div className="flex justify-between items-center py-4">
        <div>
          <p className="text-[8.5px] text-slate-500 tracking-widest uppercase mb-1">
            Response time
          </p>
          <p
            className={`text-[15px] font-bold font-sans ${getResponseColor(server?.status, server?.responseTime)}`}
          >
            {server?.responseTime ? `${server?.responseTime}ms` : "—"}
          </p>
        </div>
        <div>
          <p className="text-[8.5px] text-slate-500 tracking-widest uppercase mb-1">
            Last checked
          </p>
          <p className="text-[12px] font-bold text-slate-400 font-sans">
            {formatLastChecked(server?.lastChecked)}
          </p>
        </div>
        <div>
          <button
            className="cursor-pointer"
            onClick={() => {
              refreshParticularServer({ id: server._id });
            }}
          >
            <RefreshIcon />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-[#1c2130]">
        <span className="text-[9px] text-[#263349] tracking-wide">
          {formatUTC(server?.lastChecked)}
        </span>

        <button
          className="cursor-pointer"
          onClick={() => {
            navigate(`/server/${server?._id}`);
          }}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};
export default ServerCard;
