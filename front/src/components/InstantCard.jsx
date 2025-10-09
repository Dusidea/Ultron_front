import React from "react";

export default function InstantCard({ stream }) {
  if (!stream) return null;
  return (
    <div className="border-2 border-solid p-4">
      <div key={stream.id} className="grid grid-rows-[1fr_2fr_1fr] min-h-full ">
        <div className=" font-bold text-lg text-medium-purple-500 font-twitch ">
          {stream.streamerName}
        </div>

        <div className="flex flex-col justify-center font-twitch">
          {stream.streamTitle}
        </div>
        <div className="flex flex-col justify-end">
          <div className="flex flex-row justify-between">
            <div>Rang {stream.rank}</div>
            {/* <div className="text-white bg-medium-purple-950"> */}
            <div className="text-medium-purple-500">
              {stream.viewerCount}{" "}
              {stream.viewerCount == 1 ? "viewer" : "viewers"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
