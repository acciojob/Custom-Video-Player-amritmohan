// Get all the elements from the DOM
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Function to toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update the button based on video state
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// Function to update progress bar
function updateProgress() {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

// Function to scrub the video based on progress bar click
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Function to adjust the volume
function handleVolume() {
  video.volume = ranges[0].value;
}

// Function to adjust the playback speed
function handlePlaybackSpeed() {
  video.playbackRate = ranges[1].value;
}

// Function to skip video time
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Add event listeners for play/pause button, progress bar, skip buttons, and sliders
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', scrub);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges[0].addEventListener('input', handleVolume);
ranges[1].addEventListener('input', handlePlaybackSpeed);

// Bonus: Handle video errors (if it fails to load)
video.onerror = function() {
  alert("Sorry, the video couldn't be loaded.");
};
