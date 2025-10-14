import React, { useState } from "react";
import { format } from "date-fns";
import InstantSelector from "../components/InstantSelector";
import InstantCard from "../components/InstantCard";

export default function InstantStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [game, setGame] = useState("Hades%20II");
  const now = new Date();
  now.setMinutes(0, 0, 0);
  const [atTimeStamp, setAtTimeStamp] = useState(
    format(now, "yyyy-MM-dd'T'HH:mm")
  );

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
    <div className="flex flex-col gap-8">
      <InstantSelector
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
      <div>Heure sélectionnée : {format(atTimeStamp, "HH:mm")}</div>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(260px,260px))] xl:pl-20">
        {!loading &&
          !error &&
          stats.map((stream) => (
            <InstantCard key={stream.id} stream={stream} />
          ))}
      </div>
    </div>
  );
}
