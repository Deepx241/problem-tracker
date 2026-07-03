"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

interface Props {
  analytics: {
    easy: number;
    medium: number;
    hard: number;
    solved: number;
    todo: number;
    revision: number;
    platformStats: Record<string, number>;
  };
}

export default function AnalyticsCharts({
  analytics,
}: Props) {

  const difficultyData = [
    {
      name: "Easy",
      value: analytics.easy,
    },
    {
      name: "Medium",
      value: analytics.medium,
    },
    {
      name: "Hard",
      value: analytics.hard,
    },
  ];

  const statusData = [
    {
      name: "Solved",
      value: analytics.solved,
    },
    {
      name: "Todo",
      value: analytics.todo,
    },
    {
      name: "Revision",
      value: analytics.revision,
    },
  ];

  const platformData = Object.entries(
    analytics.platformStats
  ).map(([key, value]) => ({
    platform: key,
    count: value,
  }));

  const COLORS = [
    "#22c55e",
    "#eab308",
    "#ef4444",
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 my-10">

      <div className="bg-gray-900 rounded-2xl p-5">

        <h2 className="text-xl font-bold mb-5">
          Difficulty
        </h2>

        <ResponsiveContainer
          width="100%"
          height={280}
        >
          <PieChart>

            <Pie
              data={difficultyData}
              dataKey="value"
              outerRadius={90}
              label
            >
              {difficultyData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

      <div className="bg-gray-900 rounded-2xl p-5">

        <h2 className="text-xl font-bold mb-5">
          Status
        </h2>

        <ResponsiveContainer
          width="100%"
          height={280}
        >
          <PieChart>

            <Pie
              data={statusData}
              dataKey="value"
              outerRadius={90}
              label
            >
              <Cell fill="#22c55e" />
              <Cell fill="#f59e0b" />
              <Cell fill="#a855f7" />
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

      <div className="bg-gray-900 rounded-2xl p-5">

        <h2 className="text-xl font-bold mb-5">
          Platforms
        </h2>

        <ResponsiveContainer
          width="100%"
          height={280}
        >

          <BarChart
            data={platformData}
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="platform"
            />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="count"
              fill="#3b82f6"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}