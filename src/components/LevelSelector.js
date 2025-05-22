import React from "react";

const LevelSelector = ({ level, onChange }) => {
  return (
    <div>
      <label>
        <input
          type="radio"
          id="easy"
          value="easy"
          name="difficulty"
          checked={level === "easy"}
          onChange={onChange}
        />
        Easy
      </label>
      <label>
        <input
          type="radio"
          id="normal"
          value="normal"
          name="difficulty"
          checked={level === "normal"}
          onChange={onChange}
        />
        Normal
      </label>
      <label>
        <input
          type="radio"
          id="hard"
          value="hard"
          name="difficulty"
          checked={level === "hard"}
          onChange={onChange}
        />
        Hard
      </label>
    </div>
  );
};

export default LevelSelector;
