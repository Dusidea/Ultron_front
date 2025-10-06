import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const StatsGraph = ({ stats, interval = 15, metric = "viewers" }) => {
  // Grouper par streamer et filtrer sur interval
  const streamsByStreamer = stats.reduce((acc, item) => {
    const d = new Date(item.collectedAt.replace(" ", "T"));
    const minutes = d.getMinutes();

    if (minutes % interval === 0) {
      if (!acc[item.streamerName]) acc[item.streamerName] = [];
      acc[item.streamerName].push({
        time: d,
        value: metric === "viewers" ? item.viewerCount : item.rank,
      });
    }
    return acc;
  }, {});

  // Tri chrono par streamer
  Object.values(streamsByStreamer).forEach((arr) =>
    arr.sort((a, b) => a.time - b.time)
  );

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ff7300",
    "#ff0000",
    "#00c49f",
    "#0088FE",
    "#FFBB28",
    "#FF8042",
  ];

  return (
    <LineChart width={1000} height={500}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="time"
        type="number"
        domain={["auto", "auto"]}
        tickFormatter={(t) =>
          new Date(t).toLocaleString([], {
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        }
      />
      <YAxis
        domain={metric === "rank" ? [1, 25] : ["auto", "auto"]}
        reversed={metric === "rank"} // inversé seulement pour le rank
      />
      <Tooltip
        labelFormatter={(l) =>
          new Date(l).toLocaleString([], {
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        }
      />
      <Legend />

      {Object.entries(streamsByStreamer).map(([streamer, data], idx) => (
        <Line
          key={streamer}
          data={data.map((d) => ({ ...d, time: d.time.getTime() }))}
          dataKey="value"
          name={streamer}
          stroke={colors[idx % colors.length]}
          dot
        />
      ))}
    </LineChart>
  );
};

export default StatsGraph;
