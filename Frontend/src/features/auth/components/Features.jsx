import { ShieldIcon,ServerIcon } from '../../common/Icons';

const features = [
  {
    title: "2-minute checks",
    desc: "Your servers are pinged every 2 minutes. Downtime is detected fast — not after your users start complaining.",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2563eb"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Response time tracking",
    desc: "See how fast your server responds on every check. Spot performance degradation before it becomes an outage.",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2563eb"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Full check history",
    desc: "Every ping is logged. View a complete timeline of your server's status and response times going back days.",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2563eb"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Secure by default",
    desc: "All data is transmitted over TLS 1.3. Your server credentials and monitoring data stay private to your account.",
    icon: <ShieldIcon size={16} />,
  },
  {
    title: "Multi-server support",
    desc: "Add as many servers as you need. Monitor APIs, databases, and web services from a single dashboard.",
    icon: <ServerIcon size={16} />,
  },
  {
    title: "Visual analytics",
    desc: "Bar charts and log tables give you a clear visual picture of your server's health over time at a glance.",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2563eb"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <section className="px-8 py-14">
        <p className="text-center text-[10px] text-blue-600 tracking-[.18em] mb-2.5">
          WHAT SENTINEL DOES
        </p>
        <h2 className="text-center text-[26px] font-bold text-slate-100 font-sans tracking-tight mb-2.5">
          Everything you need to monitor your{" "}
          <span className="text-blue-500">infrastructure</span>
        </h2>
        <p className="text-center text-[12px] text-slate-500 font-sans leading-[1.7] max-w-[380px] mx-auto mb-10">
          No bloat. No noise. Just the metrics that matter for your servers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#0e1117] border border-[#1c2130] rounded-[14px] p-5"
            >
              <div className="w-9 h-9 rounded-[10px] bg-[#0d1829] border border-[#1c2d4a] flex items-center justify-center mb-3.5">
                {f.icon}
              </div>
              <p className="text-[12px] font-bold text-slate-100 font-sans tracking-tight mb-1.5">
                {f.title}
              </p>
              <p className="text-[11px] text-slate-500 font-sans leading-[1.65]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
  )
}

export default Features