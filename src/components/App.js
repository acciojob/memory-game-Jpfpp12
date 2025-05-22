import React, { useState } from "react";
import LevelSelector from "./LevelSelector.js";
import GameBoard from "./GameBoard.js";
import "../styles.css";

const App = () => {
  const [level, setLevel] = useState("easy");
  const [start, setStart] = useState(false);
  
  const handleStart = () => setStart(true);
  const handleLevelChange = (e) => {
    setLevel(e.target.value);
    setStart(false); // reset game on level change
  };
  
  return (
    <div>
      {/* Do not remove the main div */}
      <section className="levels_container">
        <h2>Select Difficulty</h2>
        <LevelSelector level={level} onChange={handleLevelChange} />
        <button onClick={handleStart} data-testid="start-button">Start Game</button>
      </section>

      {start && <GameBoard level={level} />}
    </div>
  );
};

export default App;