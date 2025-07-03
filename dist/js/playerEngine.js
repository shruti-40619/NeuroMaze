import { tileElements, playerIndex, nextIndex, trapTiles } from "./gameState.js";
import { LEVELS, TILE_CLASSES } from "./config.js";
import { showMemoryFailedMessage, showWinMessage} from "./uiManager.js";
import { currentLevel } from "./gameState.js";
import { getLevelScore, addScore, isHintUsed, markHintUsed, getCurrentScore } from "./scoreManager.js";
import { stopTimer } from "./timerManager.js";





export function setupPlayerControls(gridSize, endTileIndex) {
  let player = 0;

  tileElements[player].innerHTML = `<span class="${TILE_CLASSES.player}">🧍</span>`;

  document.addEventListener("keydown", function handleMove(e) {
    tileElements[player].innerHTML = "";
    let row = Math.floor(player / gridSize);
    let col = player % gridSize;

    let next = player;

    if (e.key === "ArrowRight" && col < gridSize - 1) next++;
    else if (e.key === "ArrowLeft" && col > 0) next--;
    else if (e.key === "ArrowUp" && row > 0) next -= gridSize;
    else if (e.key === "ArrowDown" && row < gridSize - 1) next += gridSize;

    if (trapTiles.includes(next)) {
      tileElements[next].classList.add("bg-red-700", "text-white", "text-xl", "font-bold");
      tileElements[next].innerHTML = "💥 Oops!";
      stopTimer();
      setTimeout(() => {
       showMemoryFailedMessage();
      }, 600);
      return;
    }

    if (next === endTileIndex) {
      tileElements[next].innerHTML = "🧠 Win!!";

      stopTimer(); 
      
      const { win , hint} = getLevelScore(currentLevel);
      let finalScore = win;
      const usedHint = isHintUsed();
      if (usedHint) finalScore += hint;
      addScore(finalScore);
      
      console.log(" Win tile reached.");
      console.log(" currentLevel:", currentLevel);
      console.log(" hintUsed:", usedHint);
      console.log(" score from scoreManager:", getCurrentScore());  
      setTimeout(() => 
      {
        try {
         showWinMessage({ hintUsed : usedHint, score: finalScore });
          console.log(" showWinMessage called successfully.");
         } catch (err) {
          console.error(" Error in showWinMessage:", err);
         }

      },600)
      return;
    }

    player = next;
    tileElements[player].innerHTML = `<span class="${TILE_CLASSES.player}">🧍</span>`;
  });

}

