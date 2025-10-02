import { useEffect, useState } from "react";
import Selector from "../components/Selector";
import StatsGraph from "../components/StatsGraph";

function Stats() {
  const [stats, setStats] = useState(null);
  const [game, setGame] = useState("Hades%20II");

  // validated values sent to fetch
  const [fromDate, setFromDate] = useState("2025-09-25");
  const [toDate, setToDate] = useState("2025-09-26");

  const [error, setError] = useState("");

  const fetchStats = () => {
    const url = `http://185.126.238.166/api/streams?game=${game}&from=${fromDate}&to=${toDate}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Selector
        game={game}
        setGame={setGame}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        onValidate={fetchStats}
      />

      {stats && <StatsGraph stats={stats} />}
    </div>
  );
}

export default Stats;
