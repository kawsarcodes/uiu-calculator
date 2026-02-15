let seconds = 15;
const countdownDisplay = document.getElementById("countdown");
const countdownTimer = setInterval(function () {
  seconds--;
  countdownDisplay.textContent = seconds;
  if (seconds <= 0) {
    clearInterval(countdownTimer);
    window.location.href = "/";
  }
}, 1000);
