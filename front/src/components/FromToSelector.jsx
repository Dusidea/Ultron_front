import React, { useEffect, useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import { parse, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

function FromToSelector({
  game,
  setGame,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  interval,
  setInterval,
  metric,
  setMetric,
  //   atTimeStamp,
  //   setAtTimeStamp,
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
    <div className="p-4 bg-fuchsia-950 rounded-lg  ">
      <label>Sélectionner une catégorie : </label>
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
      <br />
      <br />
      <label>Intervalle (minutes) : </label>
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
      <br />

      <label>Afficher : </label>
      <select value={metric} onChange={(e) => setMetric(e.target.value)}>
        <option value="viewers">Viewers</option>
        <option value="rank">Rank</option>
      </select>
      <div className="flex justify-center">
        <button
          onClick={onValidate}
          className="border-2 border-solid rounded-xl bg-cyan-950 p-2"
        >
          Valider
        </button>
      </div>
    </div>
  );
}

export default FromToSelector;
