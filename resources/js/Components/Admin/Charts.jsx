import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="px-3 py-2 rounded-lg text-sm bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 text-kost-dark dark:text-mint-50 shadow-sm">
            <p className="text-kost-muted dark:text-mint-100/50 text-xs mb-1">
                {label}
            </p>
            <p className="font-medium">{payload[0].value} users</p>
        </div>
    );
};

export default function StatsChart({ data = [] }) {
    const isDark = document.documentElement.classList.contains("dark");

    const axisColor = isDark ? "#6b9e94" : "#7aa080";
    const gridColor = "#ABE7B2";
    const lineColor = "#93BFC7";

    const chartData =
        data.length > 0
            ? data
            : [
                  { name: "Sen", users: 0 },
                  { name: "Sel", users: 0 },
                  { name: "Rab", users: 0 },
                  { name: "Kam", users: 0 },
                  { name: "Jum", users: 0 },
                  { name: "Sab", users: 0 },
                  { name: "Min", users: 0 },
              ];

    return (
        <div className="rounded-xl p-5 bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 transition-colors duration-300">
            <h3 className="text-sm font-medium mb-4 text-kost-dark dark:text-mint-50">
                User Growth
            </h3>

            <ResponsiveContainer width="100%" height={200}>
                <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={gridColor}
                        opacity={0.2}
                        vertical={false}
                    />

                    <XAxis
                        dataKey="name"
                        tick={{ fill: axisColor, fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tick={{ fill: axisColor, fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                    />

                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{
                            stroke: lineColor,
                            strokeWidth: 1,
                            strokeDasharray: "4 4",
                            opacity: 0.5,
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="users"
                        stroke={lineColor}
                        strokeWidth={2.5}
                        dot={{ fill: lineColor, r: 4, strokeWidth: 0 }}
                        activeDot={{ fill: lineColor, r: 6, strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}