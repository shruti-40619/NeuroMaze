import { LEVELS } from "./config.js";
import { resetState, trapTiles, tileElements } from "./gameState.js";
import { createGrid } from "./gridManager.js";
import { generateTrapIndexes, flashTraps } from "./trapEngine.js";
import { setupPlayerControls } from "./playerEngine.js";
import { startTimer } from "./timerManager.js";

const container = document.getElementById("game-grid");
let currentLevel = 0;

function startLevel(level) {
  resetState();

  const gridSize = LEVELS[level].gridSize;
  const trapCount = LEVELS[level].trapCount;

  createGrid(level, container, () => {
    const traps = generateTrapIndexes(trapCount, gridSize);
    trapTiles.push(...traps);

    flashTraps(traps, tileElements);

    setTimeout(() => {
      setupPlayerControls(gridSize, gridSize * gridSize - 1);

      
      const levelTime = 6; 
      startTimer(levelTime, () => {
        alert("⏰ Time’s up! Memory failed.");
        location.reload();
      });

    }, 1000);
  });
}

startLevel(currentLevel);

