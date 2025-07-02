export function updateLevelUI(level) {
  document.getElementById("level-display").textContent = `Level: ${level + 1}`;
}

export function showMessage(text) {
  alert(text);
}
