import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LevelSelector from "./LevelSelector.js";
import GameBoard from "./GameBoard.js";
import { setLevel, startGame } from "./gameSlice.js";
import "../styles.css";

const App = () => {
  const dispatch = useDispatch();
  const level = useSelector((state) => state.game.level);
  const started = useSelector((state) => state.game.started);

  const handleLevelChange = (e) => {
    dispatch(setLevel(e.target.value));
  };

  const handleStart = () => {
    dispatch(startGame());
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <section className="levels_container">
        <h4>Select Difficulty</h4>
        <LevelSelector level={level} onChange={handleLevelChange} />
        <button onClick={handleStart} data-testid="start-button">Start Game</button>
      </section>

      {started && <GameBoard />}
    </div>
  );
};

export default App;
