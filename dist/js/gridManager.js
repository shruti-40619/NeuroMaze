import { LEVELS, TILE_CLASSES } from "./config.js";
import { tileElements, playerIndex } from "./gameState.js";

export function createGrid(level, container, onGridComplete) {
  const { gridSize } = LEVELS[level];
  container.innerHTML = "";
  tileElements.length = 0;

  container.style.display = "grid";
  container.style.gridTemplateColumns = `repeat(${gridSize}, minmax(0, 1fr))`;

  container.style.width = "100%";
  container.style.maxWidth = "400px"; 
  container.style.gap = "1px"; 

  let currIndex = 0;
  const totalTiles = gridSize * gridSize;

  const interval = setInterval(() => {
    if (currIndex >= totalTiles) {
      clearInterval(interval);
      onGridComplete(); 
      return;
    }

    const tile = document.createElement("div");
    tile.className = TILE_CLASSES.base;

    if (currIndex === 0) {
      tile.textContent = "START";
      tile.classList.add(...TILE_CLASSES.start.split(" "));
    } else if (currIndex === totalTiles - 1) {
      tile.textContent = "END";
      tile.classList.add(...TILE_CLASSES.end.split(" "));
    }

    container.appendChild(tile);
    tileElements.push(tile);
    currIndex++;
  }, 60);
}
