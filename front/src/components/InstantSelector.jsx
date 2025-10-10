import React, { useEffect, useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import {
  format,
  parse,
  setHours,
  getHours,
  setMinutes,
  getMinutes,
} from "date-fns";
import { Info } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

function InstantSelector({
  game,
  setGame,
  atTimeStamp,
  setAtTimeStamp,
  onValidate,
}) {
  const [games, setGames] = useState([]);
  function truncateWords(str, maxLength = 50) {
    if (str.length <= maxLength) return str;
    const truncated = str.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "…";
  }

  // getting available games list
  useEffect(() => {
    fetch("http://185.126.238.166/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error(err));
  }, []);

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

  // Moving the minutes slider
  const handleMinuteChange = (e) => {
    if (!selectedDate) return;
    const totalMinutes = parseInt(e.target.value); // 0 à 1439
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const newDate = setMinutes(setHours(selectedDate, hours), minutes);
    const formatted = format(newDate, "yyyy-MM-dd'T'HH:mm");
    setAtTimeStamp(formatted);
    onValidate?.();
  };
  const sliderValue = selectedDate
    ? getHours(selectedDate) * 60 + getMinutes(selectedDate)
    : 0;
  const minAvailableDate = new Date(2025, 8, 30);
  const today = new Date();

  return (
    <div className="p-4 bg-medium-purple-900 rounded-lg flex flex-col">
      <div className="flex flex-col flex-wrap justify-between ">
        <div className="p-4  ">
          <label>Catégorie : </label>
          <select
            value={game}
            onChange={(e) => setGame(e.target.value)}
            className="bg-black truncate w-full max-w-full"
          >
            {/* mobile version display truncated values */}
            {games.map((g) => (
              <option
                key={g.id}
                value={encodeURIComponent(g.name)}
                title={g.name}
                className="inline sm:hidden"
              >
                {truncateWords(g.name)}
              </option>
            ))}
            {/* other sizes display whole values */}
            {games.map((g) => (
              <option
                key={g.id}
                value={encodeURIComponent(g.name)}
                title={g.name}
                className="hidden sm:block"
              >
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <div className="p-4 flex flex-row gap-4 flex-wrap">
          <div>
            <label>Date et heure : </label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={minAvailableDate}
              maxDate={today}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd-MM-yyyy HH:mm"
              className="border rounded-lg p-2 text-center w-40"
            />
          </div>
          <div className="flex text-sm">
            <Info size={18} />
            &nbsp; Les données commencent au 30/09/2025
          </div>
        </div>
      </div>
      <br />
      <div>
        {/* Slider 15min */}
        {selectedDate && (
          <div className="flex flex-col items-center gap-2 p-2">
            <label className="text-sm text-gray-200">
              Heure : {format(selectedDate, "HH:mm")}
            </label>
            <input
              type="range"
              min={0}
              max={1439}
              step={15}
              value={sliderValue}
              onChange={handleMinuteChange}
              className="w-3/4 accent-purple-400"
            />
            <div className="flex justify-between w-3/4 text-xs text-gray-400">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>
          </div>
        )}
      </div>

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
