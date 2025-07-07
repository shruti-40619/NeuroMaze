import { LEVELS } from "./config.js";
import { resetState, trapTiles, tileElements, setCurrentLevel,currentLevel} from "./gameState.js";
import { createGrid } from "./gridManager.js";
import { generateTrapIndexes, flashTraps, generateDecoyAndRealTraps } from "./trapEngine.js";
import { setupPlayerControls } from "./playerEngine.js";
import { startTimer,stopTimer,pauseTimer,getRemainingTime } from "./timerManager.js";
import { markHintUsed, deductScore, getLevelScore} from "./scoreManager.js";
import { showTimeoutMessage, updateLevelUI } from "./uiManager.js";



function setupHintButton(){
  const hintBtn= document.getElementById("btn-hint");
  hintBtn.disabled= false;
  hintBtn.classList.remove("opacity-50", "cursor-not-allowed");

  const newHintBtn = hintBtn.cloneNode(true);
  hintBtn.parentNode.replaceChild(newHintBtn, hintBtn);

  newHintBtn.addEventListener("click", () => {
    console.log(" Hint button clicked");
    pauseTimer();
    
    const { hint } = getLevelScore(currentLevel);
    flashTraps(trapTiles, tileElements);
    markHintUsed();
    deductScore(hint); 

    newHintBtn.disabled = true;
    newHintBtn.classList.add("opacity-50", "cursor-not-allowed");
  
    const remainingTime = getRemainingTime(); 
    setTimeout(() => {
    startTimer(remainingTime, () => {
      showTimeoutMessage();
    });
  }, 1000); 
  });
}


const container = document.getElementById("game-grid");

export function startLevel(level) {
  console.log(" Starting Level:", level);
  setCurrentLevel(level);
  resetState();

  updateLevelUI(level);

  const gridSize = LEVELS[level].gridSize;
  const trapCount = LEVELS[level].trapCount;

  console.log(" Grid created. Trap count:", trapCount);

  const { win } = getLevelScore(level);
  const maxScoreDisplay = document.getElementById("max-score");
  if (maxScoreDisplay) {
     maxScoreDisplay.textContent = win;
  }
  let traps = [];
  let decoyTraps=[];
  createGrid(level, container, () => {
    if (level === 3) {
            const { realTraps, decoyTraps:dt } = generateDecoyAndRealTraps(gridSize);
            trapTiles.push(...realTraps);
            traps = [...realTraps, ...decoyTraps];
            decoyTraps = dt; 
      } else {
             traps = generateTrapIndexes(trapCount, gridSize);
             trapTiles.push(...traps);
      }

  

    console.log(" Trap indexes:", trapTiles);


    flashTraps(traps, tileElements);

    setTimeout(() => {
      setupPlayerControls(gridSize, gridSize * gridSize - 1, decoyTraps);

      setupHintButton();
      const levelTime = LEVELS[level].timeLimit;
      startTimer(levelTime, () => {
        showTimeoutMessage();
      });

    }, 1000);
  });
}


startLevel(currentLevel);

const restartBtn = document.getElementById("btn-restart");

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    console.log("restart button clicked");
    stopTimer();
    startLevel(currentLevel);
    
  });
}

