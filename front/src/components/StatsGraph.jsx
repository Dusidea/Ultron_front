function StatsGraph({ stats }) {
  return (
    <div>
      <h2>Stats Twitch d'un channel d'exemple</h2>
      <p>Viewers : {stats[1].viewerCount}</p>
      <p>Channel : {stats[1].streamerName}</p>
      <p>Game Name : {stats[1].gameName}</p>
      <p>Started at : {stats[1].startedAt}</p>
    </div>
  );
}

export default StatsGraph;
