let INTERVAL_MS = 1000 / 60;
let timerId;
let startTimePointer = 0;
let millisecondsLastTimePointer = 0;

// Get control buttons
const start = document.getElementById("start-button");
const stop = document.getElementById("stop-button");
const reset = document.getElementById("reset-button");

// Get elements that will display time values
const hour = document.getElementById("hr");
const minute = document.getElementById("min");
const second = document.getElementById("sec");

// Helper function for formatting
const formatNumber = (number, minLength) => {
    let stringTime = String(number);
    if (stringTime.length >= minLength) {
        return stringTime.slice(0, minLength);
    }
    return stringTime.padStart(minLength, "0");
};

// Calculate elapsed time and update display
const updateTimer = () => {
    let milliseconds = performance.now() - startTimePointer + millisecondsLastTimePointer;

    // Convert milliseconds to other time units
    let seconds = milliseconds / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;

    // Format each time unit
    let milliText = formatNumber(Math.floor(milliseconds) % 1000, 3);
    let secondText = formatNumber(Math.floor(seconds) % 60, 2);
    let minuteText = formatNumber(Math.floor(minutes) % 60, 2);
    let hourText = formatNumber(Math.floor(hours), 2);
    
    // Update the HTML display with new time values
    hour.textContent = `${hourText}`;
    minute.textContent = `${minuteText}`;
    second.textContent = `${secondText}`;
}

// Start the stopwatch and update the display
const handleStart = () => {
    stop.disabled = false;
    reset.disabled = false;
    start.disabled = true;
    startTimePointer = performance.now();
    timerId = setInterval(updateTimer, INTERVAL_MS);
};

// Pause stopwatch and save elapsed time
const handleStop = () => {
    stop.disabled = false;
    reset.disabled = false;
    start.disabled = false;
    millisecondsLastTimePointer += performance.now() - startTimePointer;
    clearInterval(timerId);
};

// Stop stopwatch and reset everything back to zero
const handleReset = () => {
    stop.disabled = true;
    reset.disabled = true;
    start.disabled = false;
    clearInterval(timerId);
    hour.textContent = "00";
    minute.textContent = "00";
    second.textContent = "00";
    millisecondsLastTimePointer = 0;
};

// Attach event listeners to buttons
start.addEventListener("click", handleStart);
stop.addEventListener("click", handleStop);
reset.addEventListener("click", handleReset);

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('touchstart', () => {
    btn.querySelector('.tooltiptext').style.visibility = 'hidden';
  });
});