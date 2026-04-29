import { useState } from "react";

// ── helpers ────────────────────────────────────────────────────────────────

const formatUTC = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return `${d.toLocaleDateString()} · ${d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

/**
 * Derives incidents from a log array.
 * An "incident" is a consecutive run of "down" logs.
 *
 * @param {Array} logs
 * @returns {Array} incidents sorted newest-first
 */
const deriveIncidents = (logs = []) => {
  if (!logs.length) return [];

  // Sort oldest-first so we can walk chronologically
  const sorted = [...logs].sort(
    (a, b) => new Date(a.lastChecked) - new Date(b.lastChecked)
  );

  const incidents = [];
  let current = null;

  for (const log of sorted) {
    if (log.status === "down") {
      if (!current) {
        current = {
          id: log._id || log.id,
          startedAt: log.lastChecked,
          endedAt: null,
          duration: null,
          affectedChecks: 1,
        };
      } else {
        current.affectedChecks += 1;
        current.endedAt = null; // still ongoing
      }
    } else {
      if (current) {
        current.endedAt = log.lastChecked;
        const ms =
          new Date(current.endedAt) - new Date(current.startedAt);
        current.duration = ms;
        incidents.push({ ...current });
        current = null;
      }
    }
  }

  // If still ongoing
  if (current) {
    incidents.push({ ...current, ongoing: true });
  }

  return incidents.reverse(); // newest first
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

// ── sub-components ─────────────────────────────────────────────────────────

const StatusPill = ({ ongoing }) =>
  ongoing ? (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[9px] tracking-widest font-mono bg-red-500/10 text-red-400 border border-red-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
      ONGOING
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[9px] tracking-widest font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      RESOLVED
    </span>
  );

const IncidentRow = ({ incident, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b border-slate-800/60 last:border-b-0 transition-colors duration-150 ${
        incident.ongoing ? "bg-red-500/[0.03]" : ""
      }`}
    >
      {/* Main row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-slate-800/30 transition-colors duration-150 cursor-pointer"
      >
        {/* Index */}
        <span className="text-[10px] text-slate-600 w-5 shrink-0 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Status pill */}
        <div className="w-24 shrink-0">
          <StatusPill ongoing={incident.ongoing} />
        </div>

        {/* Started */}
        <span className="text-[11px] text-slate-400 font-mono flex-1 min-w-0 truncate">
          {formatUTC(incident.startedAt)}
        </span>

        {/* Duration */}
        <span
          className={`text-[11px] font-mono w-20 text-right shrink-0 ${
            incident.ongoing ? "text-red-400" : "text-slate-400"
          }`}
        >
          {incident.ongoing
            ? fmtDuration(
                new Date() - new Date(incident.startedAt)
              )
            : fmtDuration(incident.duration)}
        </span>

        {/* Checks affected */}
        <span className="text-[11px] text-slate-500 font-mono w-16 text-right shrink-0">
          {incident.affectedChecks}x
        </span>

        {/* Chevron */}
        <svg
          className={`w-3 h-3 text-slate-600 transition-transform duration-200 shrink-0 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="px-4 pb-3 pt-1 border-t border-slate-800/40 bg-slate-900/30">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 pl-9">
            <div>
              <p className="text-[9px] text-slate-600 tracking-widest mb-0.5">STARTED</p>
              <p className="text-[11px] text-slate-300 font-mono">{formatUTC(incident.startedAt)}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-600 tracking-widest mb-0.5">
                {incident.ongoing ? "STILL ACTIVE" : "RESOLVED"}
              </p>
              <p className="text-[11px] text-slate-300 font-mono">
                {incident.ongoing ? "—" : formatUTC(incident.endedAt)}
              </p>
            </div>
            <div>
              <p className="text-[9px] text-slate-600 tracking-widest mb-0.5">DOWNTIME</p>
              <p
                className={`text-[11px] font-mono ${
                  incident.ongoing ? "text-red-400" : "text-slate-300"
                }`}
              >
                {incident.ongoing
                  ? fmtDuration(new Date() - new Date(incident.startedAt))
                  : fmtDuration(incident.duration)}
              </p>
            </div>
            <div>
              <p className="text-[9px] text-slate-600 tracking-widest mb-0.5">FAILED CHECKS</p>
              <p className="text-[11px] text-slate-300 font-mono">
                {incident.affectedChecks}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── main export ────────────────────────────────────────────────────────────

/**
 * IncidentsSection
 *
 * Props:
 *   logs — the same `filteredLogs` array already used in ServerDetail
 */
export default function IncidentsSection({ logs = [] }) {
  const incidents = deriveIncidents(logs);
  const ongoingCount = incidents.filter((i) => i.ongoing).length;
  const totalDowntime = incidents.reduce((sum, i) => {
    if (i.ongoing) return sum + (new Date() - new Date(i.startedAt));
    return sum + (i.duration || 0);
  }, 0);

  return (
    <div className="rounded-sm border border-slate-800/60 bg-[#0c0f13] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          {/* Subtle icon */}
          <svg
            className="w-3.5 h-3.5 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <span className="text-[10px] tracking-widest text-slate-400 font-mono">
            INCIDENTS
          </span>
          {ongoingCount > 0 && (
            <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-red-500/15 text-red-400 border border-red-500/20 font-mono tracking-wider">
              {ongoingCount} ACTIVE
            </span>
          )}
        </div>

        {/* Summary stats */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[9px] text-slate-600 tracking-widest">INCIDENTS</p>
            <p className="text-[11px] text-slate-300 font-mono tabular-nums">
              {incidents.length}
            </p>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div className="text-right">
            <p className="text-[9px] text-slate-600 tracking-widest">TOTAL DOWNTIME</p>
            <p className="text-[11px] text-slate-300 font-mono tabular-nums">
              {fmtDuration(totalDowntime)}
            </p>
          </div>
        </div>
      </div>

      {/* Column headers */}
      {incidents.length > 0 && (
        <div className="flex items-center gap-4 px-4 py-2 border-b border-slate-800/40 bg-slate-900/20">
          <span className="text-[9px] text-slate-600 tracking-widest w-5 shrink-0">#</span>
          <span className="text-[9px] text-slate-600 tracking-widest w-24 shrink-0">STATUS</span>
          <span className="text-[9px] text-slate-600 tracking-widest flex-1">STARTED AT</span>
          <span className="text-[9px] text-slate-600 tracking-widest w-20 text-right shrink-0">DURATION</span>
          <span className="text-[9px] text-slate-600 tracking-widest w-16 text-right shrink-0">CHECKS</span>
          <span className="w-3 shrink-0" />
        </div>
      )}

      {/* Rows */}
      {incidents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-2">
          <svg
            className="w-5 h-5 text-emerald-500/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-[10px] text-slate-600 tracking-widest font-mono">
            NO INCIDENTS RECORDED
          </p>
        </div>
      ) : (
        <div>
          {incidents.map((incident, i) => (
            <IncidentRow key={incident.id || i} incident={incident} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}