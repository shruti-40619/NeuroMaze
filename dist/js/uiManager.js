import { startLevel } from "./main.js";
import { currentLevel } from "./gameState.js";

export function updateLevelUI(level) {
  const levelDisplay = document.getElementById("level-display");
  if (levelDisplay) {
    levelDisplay.textContent = `${level + 1}`;
  }
}


function createButton(text, onClick) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.className = "bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded shadow";
  btn.addEventListener("click", onClick);
  return btn;
}


function createPopup({ message, buttons }) {
  const popup = document.createElement("div");
  popup.className = "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999]";

  const box = document.createElement("div");
  box.className = "bg-white rounded-xl shadow-lg p-6 text-center max-w-md transform scale-100 transition-all duration-300";
  box.innerHTML = `<p class="text-xl font-bold text-blue-900 mb-4">${message}</p>`;

  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "flex gap-4 justify-center";

  buttons.forEach(({ text, onClick }) => {
    buttonWrapper.appendChild(createButton(text, () => {
      document.body.removeChild(popup);
      onClick();
    }));
  });

  box.appendChild(buttonWrapper);
  popup.appendChild(box);
  document.body.appendChild(popup);

  console.log(" Popup shown:", message);
}


export function showWinMessage({ hintUsed, score }) {
  const level = currentLevel;

  const message = hintUsed
    ? `🎉 You completed Level ${level + 1} (with help). Score: ${score}`
    : `🏆 Perfect! Level ${level + 1} complete. Score: ${score}`;

  const buttons = [
    {
      text: "➡️ Next Level",
      onClick: () => startLevel(level + 1),
    },
  ];

  if (hintUsed) {
    buttons.unshift({
      text: "🔁 Play Again",
      onClick: () => startLevel(level),
    });
  }

  createPopup({ message, buttons });
}


export function showTimeoutMessage() {
  createPopup({
    message: "⏰ Time’s up! Memory failed.",
    buttons: [
      {
        text: "🔁 Play Again",
        onClick: () => location.reload(),
      },
    ],
  });
}


export function showMemoryFailedMessage() {
  createPopup({
    message: "💥 Memory failed! Try again!",
    buttons: [
      {
        text: "🔁 Play Again",
        onClick: () => location.reload(),
      },
    ],
  });
}

