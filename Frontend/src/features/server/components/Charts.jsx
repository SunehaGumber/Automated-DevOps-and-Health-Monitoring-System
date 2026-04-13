import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const Charts = ({ chartData }) => {
  // 1. Return a placeholder if data is missing to avoid errors
  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-[120px] w-full flex items-center justify-center border border-dashed border-slate-800 rounded-xl">
        <span className="text-[10px] text-slate-600 tracking-widest">
          WAITING_FOR_DATA...
        </span>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "120px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="name" hide />
          <YAxis
            hide
            domain={[0, 500]} // This makes 1ms look like a tiny line (1/500th of the height)
          />

          <Tooltip
            cursor={{ fill: "#1c2130", opacity: 0.4 }}
            contentStyle={{
              backgroundColor: "#0e1117",
              border: "1px solid #1c2130",
              borderRadius: "8px",
              fontSize: "10px",
            }}
          />

          <Bar minPointSize={2} dataKey="responseTime" radius={[2, 2, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill || "#3b82f6"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
