import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSession } from "@/contexts/SessionContext";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-2 rounded-lg shadow-xl">
        <p className="text-foreground text-sm font-semibold">{label}</p>
        <p className="text-primary text-sm">
          정확도: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

interface AccuracyChartProps {
  className?: string;
}

const AccuracyChart = ({ className }: AccuracyChartProps) => {
  const { accuracyHistory, isSessionActive } = useSession();

  // Use real data if available, otherwise show placeholder
  const chartData = useMemo(() => {
    if (accuracyHistory.length > 0) {
      return accuracyHistory.map(point => ({
        time: point.time,
        accuracy: Math.round(point.accuracy),
      }));
    }
    // Show empty placeholder when no data
    return [
      { time: "00:00", accuracy: 0 },
      { time: "00:10", accuracy: 0 },
    ];
  }, [accuracyHistory]);

  const hasData = accuracyHistory.length > 0;

  return (
    <div className={`h-[200px] w-full ${className || ''}`}>
      {!hasData && !isSessionActive && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span className="text-sm text-muted-foreground">
            카메라를 켜면 추이가 표시됩니다
          </span>
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.2)" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} 
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1, strokeDasharray: "4 4" }} />
          <Area
            type="monotone"
            dataKey="accuracy"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorAccuracy)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AccuracyChart;
