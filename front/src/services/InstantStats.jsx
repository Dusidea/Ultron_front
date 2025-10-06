import React, { useState } from "react";
import Selector from "../components/Selector";
import Card from "../components/Card";

export default function InstantStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [game, setGame] = useState("Hades%20II");
  const [atTimeStamp, setAtTimeStamp] = useState("2025-09-25T15:00");

  const fetchStats = async () => {
    setLoading(true);
    setError(null);

    const url = `http://185.126.238.166/api/streamtime?game=${game}&time=${atTimeStamp}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const resData = await res.json();

      setStats(resData.data || []);
    } catch (err) {
      console.error(err);
      setError("Impossible de récupérer les streams");
      setStats([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Selector
        game={game}
        setGame={setGame}
        atTimeStamp={atTimeStamp}
        setAtTimeStamp={setAtTimeStamp}
        onValidate={fetchStats}
      />

      {/* Status messages*/}
      {loading && <div>Chargement...</div>}
      {error && <div>{error}</div>}

      {!loading && !error && stats.length === 0 && (
        <div>Aucun stream trouvé</div>
      )}

      <div>
        {!loading &&
          !error &&
          stats.map((stream) => <Card key={stream.id} stream={stream} />)}
      </div>
    </div>
  );
}
