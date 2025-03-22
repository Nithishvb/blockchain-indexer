import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

const data = [
  { name: "Jan 1", synced: 4000, pending: 2400 },
  { name: "Jan 2", synced: 3000, pending: 1398 },
  { name: "Jan 3", synced: 2000, pending: 9800 },
  { name: "Jan 4", synced: 2780, pending: 3908 },
  { name: "Jan 5", synced: 1890, pending: 4800 },
  { name: "Jan 6", synced: 2390, pending: 3800 },
  { name: "Jan 7", synced: 3490, pending: 4300 },
];

// Custom tooltip
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 rounded-lg border border-border/50 shadow-lg">
        <p className="text-sm font-medium mb-1">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full`}
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-xs">
                {entry.name}:{" "}
                <span className="font-medium">
                  {entry.value?.toLocaleString()}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

const SyncGraph = () => {
  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle>Sync Progress</CardTitle>
        <CardDescription>
          Transaction syncing progress over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                dy={10}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="synced"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 6,
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
              />
              <Line
                type="monotone"
                dataKey="pending"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 6,
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm">Synced</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-sm">Pending</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SyncGraph;
