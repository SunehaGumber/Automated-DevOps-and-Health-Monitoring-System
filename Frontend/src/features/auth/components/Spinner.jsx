export const Spinner = ({ size = "md", label = true }) => {
  const sizes = {
    sm: { outer: "w-6 h-6", inner: "w-3 h-3", ring: "w-6 h-6", text: "text-[9px]" },
    md: { outer: "w-12 h-12", inner: "w-5 h-5", ring: "w-12 h-12", text: "text-[10px]" },
    lg: { outer: "w-20 h-20", inner: "w-8 h-8", ring: "w-20 h-20", text: "text-[11px]" },
  };

  const s = sizes[size];

  return (
    <div className="flex flex-col  mt-50 items-center justify-center gap-3">

      {/* Spinner ring */}
      <div className="relative flex items-center justify-center">

        {/* Outer rotating ring */}
        <div
          className={`${s.ring} rounded-full border-2 border-[#1c2130] border-t-blue-600 animate-spin absolute`}
        />

        {/* Inner static shield icon container */}
        <div className={`${s.outer} rounded-full bg-[#0d1829] border border-[#1c2d4a] flex items-center justify-center`}>
          <svg
            width={size === "sm" ? 10 : size === "md" ? 16 : 24}
            height={size === "sm" ? 10 : size === "md" ? 16 : 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563eb"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>

      </div>

      {/* Label */}
      {label && (
        <div className="flex flex-col items-center gap-1">
          <p className={`${s.text} text-slate-400 font-mono tracking-[.14em]`}>
            Loading...
          </p>
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full bg-blue-600"
                style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};