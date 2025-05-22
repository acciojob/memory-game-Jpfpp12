import React, { useState, useEffect } from "react";
import Tile from "./Tile.js";

const levelConfig = {
  easy: 4,
  normal: 8,
  hard: 16,
};

const GameBoard = ({ level }) => {
  const [tiles, setTiles] = useState([]);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const numPairs = levelConfig[level];
    const tileNumbers = [...Array(numPairs).keys()];
    const shuffled = shuffle([...tileNumbers, ...tileNumbers]);
    setTiles(shuffled);
    setFirst(null);
    setSecond(null);
    setAttempts(0);
    setMatched([]);
  }, [level]);

  const handleClick = (index) => {
    if (first === null) {
      setFirst(index);
    } else if (second === null && index !== first) {
      setSecond(index);
      setAttempts((prev) => prev + 1);

      if (tiles[first] === tiles[index]) {
        setMatched((prev) => [...prev, first, index]);
        setTimeout(() => {
          setFirst(null);
          setSecond(null);
        }, 500);
      } else {
        setTimeout(() => {
          setFirst(null);
          setSecond(null);
        }, 800);
      }
    }
  };

  const isRevealed = (index) =>
    index === first || index === second || matched.includes(index);

  return (
    <div>
      <div
        className="cells_container"
        style={{
          gridTemplateColumns: `repeat(${Math.sqrt(levelConfig[level] * 2)}, 60px)`,
        }}
      >
        {tiles.map((num, index) => (
          <Tile
            key={index}
            index={index}
            number={num}
            isRevealed={isRevealed(index)}
            isMatched={matched.includes(index)}
            onClick={handleClick}
          />
        ))}
      </div>
      <div className="info">
        <p>Attempts: <span data-testid="attempt-count">{attempts}</span></p>
        {matched.length === tiles.length && <p>🎉 You matched all in {attempts} attempts!</p>}
      </div>
    </div>
  );
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default GameBoard;
