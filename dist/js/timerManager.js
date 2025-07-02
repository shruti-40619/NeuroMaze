export let currentTimer = 0;
let timerInterval = null;

export function startTimer(seconds, onTimeout) {
  clearInterval(timerInterval); 

  if (seconds === 0) {
    console.warn("Invalid timer duration.");
    if (typeof onTimeout === "function") onTimeout();
    return;
  }

  currentTimer = seconds;

  const timeDisplay = document.querySelector("#timer");
  if (!timeDisplay) {
    console.error("Timer UI element with ID 'timer' not found in DOM.");
    return;
  }

  timeDisplay.textContent = currentTimer;

  timerInterval = setInterval(() => {
    currentTimer--;
    timeDisplay.textContent = currentTimer;

    if (currentTimer <= 0) {
      clearInterval(timerInterval);
      if (typeof onTimeout === "function") {
        onTimeout();
      }
    }
  }, 1000);
}

