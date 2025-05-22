import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tile from "./Tile.js";
import { clickTile, resetSelection } from "../store/gameSlice.js";

const levelConfig = {
  easy: 4,
  normal: 8,
  hard: 16,
};

const GameBoard = () => {
  const dispatch = useDispatch();
  const { tiles, first, second, matched, attempts, level } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    if (first !== null && second !== null) {
      if (tiles[first] !== tiles[second]) {
        // Tiles do not match - hide after delay
        const timer = setTimeout(() => {
          dispatch(resetSelection());
        }, 800);
        return () => clearTimeout(timer);
      } else {
        // Tiles match - reset selections quickly
        const timer = setTimeout(() => {
          dispatch(resetSelection());
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [first, second, tiles, dispatch]);

  const handleClick = (index) => {
    if (
      first === index ||
      second === index ||
      matched.includes(index)
    ) {
      return; // ignore clicking revealed or matched tiles
    }
    if (second === null) {
      dispatch(clickTile(index));
    }
  };

  const gridColumns = Math.sqrt(levelConfig[level] * 2);

  return (
    <>
      <div
        className="cells_container"
        style={{
          gridTemplateColumns: `repeat(${gridColumns}, 60px)`,
        }}
      >
        {tiles.map((num, index) => (
          <Tile
            key={index}
            index={index}
            number={num}
            isRevealed={index === first || index === second || matched.includes(index)}
            isMatched={matched.includes(index)}
            onClick={handleClick}
          />
        ))}
      </div>
      <div className="info">
        <p>
          Attempts: <span data-testid="attempt-count">{attempts}</span>
        </p>
        {matched.length === tiles.length && (
          <p>🎉 You matched all in {attempts} attempts!</p>
        )}
      </div>
    </>
  );
};

export default GameBoard;
