import { TILE_CLASSES } from "./config.js";

export function generateTrapIndexes(count, gridSize) {
  const trapIndexes = new Set();
  while (trapIndexes.size < count) {
    const rand = Math.floor(Math.random() * (gridSize * gridSize));
    if (rand !== 0 && rand !== gridSize * gridSize - 1) {
      trapIndexes.add(rand);
    }
  }
  return Array.from(trapIndexes);
}

export function flashTraps(trapIndexes, tiles) {
  trapIndexes.forEach(i => tiles[i].classList.add(...TILE_CLASSES.trapFlash));
  setTimeout(() => {
    trapIndexes.forEach(i => tiles[i].classList.remove(...TILE_CLASSES.trapFlash));
  }, 1000);
}
