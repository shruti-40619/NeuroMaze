let currentTimer = 0;
let timerInterval = null;
let onTimeoutCallback = null;

export function startTimer(seconds, onTimeout) {
  clearInterval(timerInterval);

  if (seconds <= 0) {
    console.warn("Invalid timer duration.");
    if (typeof onTimeout === "function") onTimeout();
    return;
  }

  currentTimer = seconds;
  onTimeoutCallback = onTimeout;

  updateTimerUI();

  timerInterval = setInterval(() => {
    currentTimer--;
    updateTimerUI();

    if (currentTimer <= 0) {
      clearInterval(timerInterval);
      if (typeof onTimeoutCallback === "function") {
        onTimeoutCallback();
      }
    }
  }, 1000);
}

export function stopTimer() {
  clearInterval(timerInterval);
}

export function pauseTimer() {
  clearInterval(timerInterval);
}


export function getRemainingTime() {
  return currentTimer;
}

function updateTimerUI() {
  const timeDisplay = document.querySelector("#timer");
  if (timeDisplay) {
    timeDisplay.textContent = currentTimer;
  }
}
