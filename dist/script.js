// LEVEL 1 GRID

// ***grid creation***

let gridContainer = document.getElementById("game-grid");

gridContainer.innerHTML="";
let currIndex=0;
const gridSize=5;
const totalTiles=gridSize * gridSize;
const tileElements = [];


const interval= setInterval(() => {
    if (currIndex >= totalTiles) {
        clearInterval(interval);  
         setTimeout(() => {
         flashTraps(trapTiles, tileElements);
         }, 500);
         setTimeout(() => {
         tileElements[playerIndex].innerHTML = `<span class= text-3xl md:text-6xl>🧍</span>`;
         
         document.addEventListener("keydown", handlePlayerMove);
        }, 1600);

        return;
    }
    

const tiles = document.createElement("div");
tiles.className = "bg-gray-500 aspect-square rounded shadow-md transition-all duration-500 hover:bg-gray-600 cursor-pointer";

if (currIndex === 0) {
     tiles.textContent = "START"; 
     tiles.classList.add("flex", "items-center", "justify-center", "text-green-950", "font-bold", "text-sm");
    } else if (currIndex === 24) {
     tiles.textContent = "END";
     tiles.classList.add("flex", "items-center", "justify-center", "text-red-950", "font-bold", "text-sm");
    }

setTimeout(() => {
    tiles.style.opacity = "1";
    tiles.style.transform = "scale(1)";
  }, 10);
gridContainer.appendChild(tiles);
tileElements.push(tiles);
currIndex++;
}, 60); 

// *** generating trap tiles ***

const trapCount = 5;


function generatetrapIndexes(count,gridsize){
    const trapIndexes= new Set();
    while(trapIndexes.size<= count) {
        let rand = Math.floor(Math.random() * (gridsize * gridsize ))
        if(rand!==0 && rand!== (gridsize * gridsize - 1)) {
            trapIndexes.add(rand)
    }

}
return Array.from(trapIndexes);
}

const trapTiles= generatetrapIndexes(trapCount,gridSize);

// *** flash trap tiles ***
function flashTraps(trapIndexes, tiles) {
  trapIndexes.forEach(index => {
    
    tiles[index].classList.add(
      "bg-gradient-to-br",
      "from-red-900",
      "via-red-800",
      "to-red-700",
      "animate-pulse",
      "shadow-lg",
      "shadow-red-300"
    ); 
  });

 
  setTimeout(() => {
    trapIndexes.forEach(index => {
      tiles[index].classList.remove(
      "bg-gradient-to-br",
      "from-red-900",
      "via-red-800",
      "to-red-700",
      "animate-pulse",
      "shadow-lg",
      "shadow-red-300"
      );
      
    });
  }, 1000);
}

// *** player movement ***

let playerIndex=0;


function handlePlayerMove(e) {
  tileElements[playerIndex].innerHTML = "";

  const row= Math.floor(playerIndex / gridSize);
  const col= playerIndex % gridSize

  if(e.key === "ArrowRight" && col < gridSize-1){
    playerIndex++;
  }
  else if(e.key === "ArrowLeft" && col>0){
    playerIndex--;
  }
  else if(e.key === "ArrowUp" && row>0){
    playerIndex -= gridSize;
  }
  else if(e.key === "ArrowDown" && row < gridSize-1){
    playerIndex += gridSize;
  }

tileElements[playerIndex].innerHTML= `<span class= text-3xl md:text-6xl>🧍</span>`

}
