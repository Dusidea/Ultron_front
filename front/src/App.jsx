import { useState } from "react";

import "./App.css";
import Banner from "./components/Banner";
import Stats from "./services/Stats";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Banner />
      <div></div>
      <h1>TwitchStats</h1>

      <Stats />
    </>
  );
}

export default App;
