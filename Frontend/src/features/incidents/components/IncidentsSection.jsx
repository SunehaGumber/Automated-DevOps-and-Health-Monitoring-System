import { useState, useEffect } from "react";
import { useIncident } from "../hooks/useIncident";

// ── helpers ─────────────────────────────────────────

const formatUTC = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return `${d.toLocaleDateString()} · ${d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const fmtDuration = (ms) => {
  if (!ms || ms <= 0) return "< 1 min";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

// ── sub-components ──────────────────────────────────

const StatusPill = ({ ongoing }) =>
  ongoing ? (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[9px] bg-red-500/10 text-red-400 border border-red-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
      ONGOING
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      RESOLVED
    </span>
  );

const IncidentRow = ({ incident, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b border-slate-800/60 ${incident.ongoing ? "bg-red-500/[0.03]" : ""}`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-slate-800/30"
      >
        <span className="text-[10px] text-slate-600 w-5">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="w-24">
          <StatusPill ongoing={incident.ongoing} />
        </div>

        <span className="text-[11px] text-slate-400 font-mono flex-1 truncate">
          {formatUTC(incident.startedAt)}
        </span>

        <span
          className={`text-[11px] font-mono w-20 text-right ${
            incident.ongoing ? "text-red-400" : "text-slate-400"
          }`}
        >
          {incident.ongoing
            ? fmtDuration(new Date() - new Date(incident.startedAt))
            : fmtDuration(incident.duration)}
        </span>
      </button>

      {open && (
        <div className="px-4 pb-3 pt-1 border-t border-slate-800/40">
          <div className="grid grid-cols-2 gap-4 pl-9">
            <div>
              <p className="text-[9px] text-slate-600">STARTED</p>
              <p className="text-[11px] text-slate-300 font-mono">
                {formatUTC(incident.startedAt)}
              </p>
            </div>
            <div>
              <p className="text-[9px] text-slate-600">
                {incident.ongoing ? "STILL ACTIVE" : "RESOLVED"}
              </p>
              <p className="text-[11px] text-slate-300 font-mono">
                {incident.ongoing ? "YES" : formatUTC(incident.endedAt)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── main component ──────────────────────────────────

export default function IncidentsSection({ id }) {
  const { handleShowIncidents, incidents } = useIncident(id);

  useEffect(() => {
    const fetchIncidents = async () => {
      if (id) {
        const data = await handleShowIncidents({ id });
      }
    };

    fetchIncidents();
  }, [id]);

  // map backend → UI
  const mappedIncidents = incidents.map((i) => ({
    id: i._id,
    startedAt: i.startTime,
    endedAt: i.resolvedAt,
    duration:
      i.resolvedAt === null
        ? null
        : new Date(i.resolvedAt) - new Date(i.startTime),
    ongoing: i.status === "open",
  }));

  const ongoingCount = mappedIncidents.filter((i) => i.ongoing).length;

  const totalDowntime = mappedIncidents.reduce((sum, i) => {
    if (i.ongoing) return sum + (new Date() - new Date(i.startedAt));
    return sum + (i.duration || 0);
  }, 0);

  return (
    <div className="rounded-sm border border-slate-800/60 bg-[#0c0f13] overflow-hidden">
      {/* Header */}
      <div className="flex justify-between px-4 py-3 border-b border-slate-800/60">
        <span className="text-[10px] text-slate-400 font-mono">INCIDENTS</span>

        <div className="flex gap-4">
          <span className="text-[11px] text-slate-300 font-mono">
            {mappedIncidents.length}
          </span>
          <span className="text-[11px] text-slate-300 font-mono">
            {fmtDuration(totalDowntime)}
          </span>
        </div>
      </div>

      {/* Empty */}
      {mappedIncidents.length === 0 ? (
        <div className="text-center py-10 text-slate-500 text-sm">
          No incidents recorded
        </div>
      ) : (
        mappedIncidents.map((incident, i) => (
          <IncidentRow key={incident.id} incident={incident} index={i} />
        ))
      )}
    </div>
  );
}
