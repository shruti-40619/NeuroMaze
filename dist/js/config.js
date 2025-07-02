export const LEVELS = [
  { gridSize: 5, trapCount: 5 },
  { gridSize: 5, trapCount: 7 },
  { gridSize: 6, trapCount: 9 },
  { gridSize: 6, trapCount: 12 },
  { gridSize: 6, trapCount: 10 },
  { gridSize: 7, trapCount: 12 },
  { gridSize: 7, trapCount: 12 },
  { gridSize: 7, trapCount: 13 },
  { gridSize: 8, trapCount: 14 },
  { gridSize: 8, trapCount: 15 },
 
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
