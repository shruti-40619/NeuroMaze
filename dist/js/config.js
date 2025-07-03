export const LEVELS = [
  { gridSize: 5, trapCount: 5 , timeLimit: 6},
  { gridSize: 5, trapCount: 7 , timeLimit: 8},
  { gridSize: 6, trapCount: 9 , timeLimit: 10},
  { gridSize: 6, trapCount: 12, timeLimit: 12},
  { gridSize: 6, trapCount: 10, timeLimit: 14},
  { gridSize: 7, trapCount: 12, timeLimit: 16},
  { gridSize: 7, trapCount: 12, timeLimit: 18},
  { gridSize: 7, trapCount: 13, timeLimit: 20},
  { gridSize: 8, trapCount: 14, timeLimit: 22},
  { gridSize: 8, trapCount: 15, timeLimit: 24},
 
];

export const TILE_CLASSES = {
  base: "bg-gray-500 aspect-square rounded shadow-md transition-all duration-500 hover:bg-gray-600 cursor-pointer",
  start: "flex items-center justify-center text-green-950 font-bold text-sm",
  end: "flex items-center justify-center text-red-950 font-bold text-sm",
  player: "text-3xl md:text-6xl",
  trapFlash: [
    "bg-gradient-to-br", "from-red-900", "via-red-800", "to-red-700",
    "animate-pulse", "shadow-lg", "shadow-red-300"
  ]
};
