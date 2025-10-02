import { useEffect, useState } from "react";

function Selector({
  game,
  setGame,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
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

      <br />
      <br />
      <label>Du : </label>
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

      <button onClick={onValidate}>Valider</button>
    </div>
  );
}

export default Selector;
