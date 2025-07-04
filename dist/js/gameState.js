export let tileElements = [];
export let playerIndex = 0;
export let nextIndex = 0;
export let trapTiles = [];
let currentLevel = 0;

export function resetState() {
  tileElements = [];
  playerIndex = 0;
  nextIndex = 0;
  trapTiles = [];
}

export function setCurrentLevel(level) {
  console.log("📌 setCurrentLevel called:", level);
  currentLevel = level;
}

export { currentLevel };
