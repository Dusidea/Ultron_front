import { useEffect, useState } from "react";

import FromToSelector from "../components/FromToSelector";
import FromToGraph from "../components/FromToGraph";

function FromToStats() {
  const [stats, setStats] = useState(null);
  const [game, setGame] = useState("Hades%20II");
  const [fromDate, setFromDate] = useState("2025-09-25");
  const [toDate, setToDate] = useState("2025-09-26");
  const [interval, setInterval] = useState(15);
  const [metric, setMetric] = useState("rank");

  const fetchStats = () => {
    const url = `http://185.126.238.166/api/streams?game=${game}&from=${fromDate}&to=${toDate}`;
    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        console.log("Meta:", resData.meta); //where count is the number of objects

        setStats(resData.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <FromToSelector
        game={game}
        setGame={setGame}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        interval={interval}
        setInterval={setInterval}
        metric={metric}
        setMetric={setMetric}
        onValidate={fetchStats}
      />

      {stats && <FromToGraph stats={stats} interval={15} metric={metric} />}
    </div>
  );
}

export default FromToStats;
