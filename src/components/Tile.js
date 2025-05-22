import React from "react";

const Tile = ({ index, number, isRevealed, isMatched, onClick }) => {
  const handleClick = () => {
    if (!isRevealed && !isMatched) {
      onClick(index);
    }
  };

  return (
    <div
      className={`tile ${isRevealed || isMatched ? "revealed" : ""}`}
      onClick={handleClick}
      data-testid={`tile-${index}`}
    >
      {isRevealed || isMatched ? number : ""}
    </div>
  );
};

export default Tile;
