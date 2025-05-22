import { createSlice } from "@reduxjs/toolkit";

const levelConfig = {
  easy: 4,
  normal: 8,
  hard: 16,
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const initialState = {
  level: "easy",
  started: false,
  tiles: [],
  first: null,
  second: null,
  attempts: 0,
  matched: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setLevel(state, action) {
      state.level = action.payload;
      state.started = false;
      state.tiles = [];
      state.first = null;
      state.second = null;
      state.attempts = 0;
      state.matched = [];
    },
    startGame(state) {
      const numPairs = levelConfig[state.level];
      const tileNumbers = [...Array(numPairs).keys()];
      state.tiles = shuffle([...tileNumbers, ...tileNumbers]);
      state.started = true;
      state.first = null;
      state.second = null;
      state.attempts = 0;
      state.matched = [];
    },
    clickTile(state, action) {
      const index = action.payload;
      if (state.first === null) {
        state.first = index;
      } else if (state.second === null && index !== state.first) {
        state.second = index;
        state.attempts += 1;

        if (state.tiles[state.first] === state.tiles[index]) {
          state.matched.push(state.first, index);
          // Reset first and second after a short delay handled in component
        }
      }
    },
    resetSelection(state) {
      state.first = null;
      state.second = null;
    },
  },
});

export const { setLevel, startGame, clickTile, resetSelection } = gameSlice.actions;
export default gameSlice.reducer;
