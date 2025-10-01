import { useEffect, useState } from "react";

function Stats() {
  const [stats, setStats] = useState(null);

  const [games, setGames] = useState([]); // available games list

  const [game, setGame] = useState("Hades%20II");
  const [fromDate, setFromDate] = useState("2025-09-25");
  const [toDate, setToDate] = useState("2025-09-26");

  useEffect(() => {
    if (!game || !fromDate || !toDate) return;

    const url = `http://185.126.238.166/api/streams?game=${game}&from=${fromDate}&to=${toDate}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, [game, fromDate, toDate]);

  // Getting games list to choose from
  useEffect(() => {
    fetch("http://185.126.238.166/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) return <p>Chargement...</p>;

  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <label>Choisir un jeu : </label>
        <select value={game} onChange={(e) => setGame(e.target.value)}>
          {games.map((g) => (
            <option key={g.id} value={encodeURIComponent(g.name)}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <h2>Stats Twitch d'un channel d'exemple</h2>
      <p>Viewers : {stats[1].viewerCount}</p>
      <p>Channel : {stats[1].streamerName}</p>
      <p>Game Name : {stats[1].gameName}</p>
    </div>
  );
}

export default Stats;
