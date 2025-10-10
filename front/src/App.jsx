import { useState } from "react";

// import "./App.css";
import Banner from "./components/Banner";
import FromToStats from "./services/FromToStats";
import InstantStats from "./services/InstantStats";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container mx-auto  flex flex-col gap-8">
      <Banner />

      {/* <FromToStats /> */}
      <InstantStats />
    </div>
  );
}

export default App;
