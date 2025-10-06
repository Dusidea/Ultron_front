import React from "react";

export default function Card({ stream }) {
  if (!stream) return null;
  return (
    <>
      <div key={stream.id}>
        <h3>{stream.streamerName}</h3>

        <div>{stream.streamTitle}</div>
        <div>{stream.viewerCount}</div>
        <div>{stream.rank}</div>
      </div>
    </>
  );
}
