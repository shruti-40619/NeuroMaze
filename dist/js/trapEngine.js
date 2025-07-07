import { TILE_CLASSES } from "./config.js";

function heuristic(a, b, gridSize) {
  const [ar, ac] = [Math.floor(a / gridSize), a % gridSize];
  const [br, bc] = [Math.floor(b / gridSize), b % gridSize];
  return Math.abs(ar - br) + Math.abs(ac - bc) + Math.random();
}

function getTileCost(index, gridSize) {
  const r = Math.floor(index / gridSize);
  const c = index % gridSize;
  const edgePenalty = (r === 0 || r === gridSize - 1 || c === 0 || c === gridSize - 1) ? 3 : 1;
  return edgePenalty;
}

function aStarPath(gridSize, start, goal) {
  const totalTiles = gridSize * gridSize;
  const openSet = new Set([start]);
  const cameFrom = {};
  const gScore = Array(totalTiles).fill(Infinity);
  const fScore = Array(totalTiles).fill(Infinity);

  gScore[start] = 0;
  fScore[start] = heuristic(start, goal, gridSize);

  while (openSet.size > 0) {
    let current = [...openSet].reduce((a, b) => fScore[a] < fScore[b] ? a : b);
    if (current === goal) {
      const path = [];
      while (current in cameFrom) {
        path.push(current);
        current = cameFrom[current];
      }
      return [start, ...path.reverse()];
    }

    openSet.delete(current);

    const [r, c] = [Math.floor(current / gridSize), current % gridSize];
    const neighbors = [];
    [[0, 1], [1, 0], [0, -1], [-1, 0]].forEach(([dr, dc]) => {
      const [nr, nc] = [r + dr, c + dc];
      if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize) {
        neighbors.push(nr * gridSize + nc);
      }
    });

    for (let neighbor of neighbors) {
      const tentative = gScore[current] + getTileCost(neighbor, gridSize);
      if (tentative < gScore[neighbor]) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentative;
        fScore[neighbor] = tentative + heuristic(neighbor, goal, gridSize);
        openSet.add(neighbor);
      }
    }
  }

  return [start];
}

function generateSafeTrapIndexes(gridSize, count, path) {
  const totalTiles = gridSize * gridSize;
  const safeSet = new Set(path);
  const trapSet = new Set();

  while (trapSet.size < count) {
    const rand = Math.floor(Math.random() * totalTiles);
    if (!safeSet.has(rand) && rand !== 0 && rand !== totalTiles - 1) {
      trapSet.add(rand);
    }
  }

  return Array.from(trapSet);
}

export function generateTrapIndexes(count, gridSize) {
  const chosenPath = aStarPath(gridSize, 0, gridSize * gridSize - 1);
  return generateSafeTrapIndexes(gridSize, count, chosenPath);
}



// level 4 twist

 export function generateDecoyAndRealTraps(gridSize, realCount = 8, decoyCount = 4) {
  const totalTiles = gridSize * gridSize;
  const path = aStarPath(gridSize, 0, totalTiles - 1);
  const safeSet = new Set(path);

  const realTraps = new Set();
  const decoyTraps = new Set();

  while (realTraps.size < realCount) {
    const rand = Math.floor(Math.random() * totalTiles);
    if (!safeSet.has(rand) && rand !== 0 && rand !== totalTiles - 1) {
      realTraps.add(rand);
    }
  }

  while (decoyTraps.size < decoyCount) {
    const rand = Math.floor(Math.random() * totalTiles);
    if (
      !safeSet.has(rand) &&
      !realTraps.has(rand) &&
      rand !== 0 &&
      rand !== totalTiles - 1
    ) {
      decoyTraps.add(rand);
    }
  }

  return {
    path,
    realTraps: Array.from(realTraps),
    decoyTraps: Array.from(decoyTraps)
  };
}

export function flashTraps(trapIndexes, tiles) {
  trapIndexes.forEach(i => tiles[i].classList.add(...TILE_CLASSES.trapFlash));
  setTimeout(() => {
    trapIndexes.forEach(i => tiles[i].classList.remove(...TILE_CLASSES.trapFlash));
  }, 1000);
}


