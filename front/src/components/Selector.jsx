import { useEffect, useState } from "react";

function Selector({
  game,
  setGame,
  // fromDate,
  // setFromDate,
  // toDate,
  // setToDate,
  // interval,
  // setInterval,
  // metric,
  // setMetric,
  atTimeStamp,
  setAtTimeStamp,
  onValidate,
}) {
  const [games, setGames] = useState([]);

  // getting available games list
  useEffect(() => {
    fetch("http://185.126.238.166/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <label>Choisir un jeu : </label>
      <select value={game} onChange={(e) => setGame(e.target.value)}>
        {games.map((g) => (
          <option key={g.id} value={encodeURIComponent(g.name)}>
            {g.name}
          </option>
        ))}
      </select>
      <label>A : </label>
      <input
        type="datetime-local"
        name="time"
        value={atTimeStamp}
        onChange={(e) => setAtTimeStamp(e.target.value)}
      />
      <br />
      <br />

      <br />
      <br />
      {/* <label>Du : </label>
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
      <label>Au : </label>
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />
      <br />
      <br /> */}
      {/* <label>Intervalle (minutes) : </label>
      <select
        value={interval}
        onChange={(e) => setInterval(Number(e.target.value))}
      >
        <option value={5}>5 min</option>
        <option value={15}>15 min</option>
        <option value={30}>30 min</option>
        <option value={60}>1 heure</option>
      </select>
      <br />
      <br /> */}

      {/* <label>Afficher : </label>
      <select value={metric} onChange={(e) => setMetric(e.target.value)}>
        <option value="viewers">Viewers</option>
        <option value="rank">Rank</option>
      </select> */}

      <button onClick={onValidate}>Valider</button>
    </div>
  );
}

export default Selector;
