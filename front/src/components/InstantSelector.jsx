import React, { useEffect, useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import { parse, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

function InstantSelector({
  game,
  setGame,
  atTimeStamp,
  setAtTimeStamp,
  onValidate,
}) {
  const [games, setGames] = useState([]);

  // Convert ISO-like ("2025-09-25T15:00") sting date into Date object
  const selectedDate = useMemo(() => {
    if (!atTimeStamp) return null;
    try {
      return parse(atTimeStamp, "yyyy-MM-dd'T'HH:mm", new Date());
    } catch {
      return null;
    }
  }, [atTimeStamp]);

  // Detectecting change in the datepicker
  const handleDateChange = (date) => {
    if (!date) return;
    // formate Date → string into same parent format state
    const formatted = format(date, "yyyy-MM-dd'T'HH:mm");
    setAtTimeStamp(formatted);
  };

  // getting available games list
  useEffect(() => {
    fetch("http://185.126.238.166/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-medium-purple-900 rounded-lg flex flex-col">
      <div className="flex flex-col flex-wrap justify-between ">
        <div className="p-4">
          <label>Catégorie : </label>
          <select
            value={game}
            onChange={(e) => setGame(e.target.value)}
            className="bg-black"
          >
            {games.map((g) => (
              <option key={g.id} value={encodeURIComponent(g.name)}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <div className="p-4">
          <label>Date et heure : </label>

          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd-MM-yyyy HH:mm"
            className="border rounded-lg p-2 text-center w-40"
          />
        </div>
      </div>
      <br />

      <div className="flex justify-center">
        <button
          onClick={onValidate}
          className=" rounded-xl bg-medium-purple-400 p-3 w-1/5 "
        >
          Valider
        </button>
      </div>
    </div>
  );
}

export default InstantSelector;
