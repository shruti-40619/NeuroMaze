import { tileElements, playerIndex, nextIndex, trapTiles } from "./gameState.js";
import { LEVELS, TILE_CLASSES } from "./config.js";

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
      setTimeout(() => {
        alert("💥 Memory failed! Try again!");
        location.reload();
      }, 600);
      return;
    }

    if (next === endTileIndex) {
      tileElements[next].innerHTML = "🧠 Win!!";
      setTimeout(() => alert("🎉 Level Complete!"), 600);
      return;
    }

    player = next;
    tileElements[player].innerHTML = `<span class="${TILE_CLASSES.player}">🧍</span>`;
  });
}
