import listMusic from "./listMusic";
var currentSongIndex = 0;

var audio = document.getElementById('player-audio');
var songName = document.getElementById('song-name');
var artistName = document.getElementById('name-artist');
var playButton = document.getElementById('play-pause');
var backwardButton = document.querySelector('.fa-backward');
var forwardButton = document.querySelector('.fa-forward');
var currentTimeSpan = document.querySelector('.current-time');
var durantionSpan = document.querySelector('.duration');
var seekSlider = document.getElementById('seek-slider');
var repeatIcon = document.querySelector('.fa-repeat');

function formatTime(timeInSeconds) {
  var minutes = Math.floor(timeInSeconds / 60);
  var seconds = Math.floor(timeInSeconds % 60);

  var formattedTime = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  return formattedTime;
}

function updateSeekBar() {
  seekSlider.value = audio.currentTime;
}

function onSeekBarChange() {
  audio.currentTime = seekSlider.value;
}

function updateCurrentTime() {
  currentTimeSpan.textContent = formatTime(audio.currentTime);
}

function updateDuration() {
  durantionSpan.textContent = formatTime(audio.duration);
  seekSlider.max = audio.duration;
}

var isPlaying = false;

function updatePlayPauseIcon() {
  if (isPlaying) {
    playButton.classList.remove('fa-play');
    playButton.classList.add('fa-pause');
  } else {
    playButton.classList.remove('fa-pause');
    playButton.classList.add('fa-play');
  }
}

function playPause() {
  if (audio.paused) {
    audio.play();
    isPlaying = true;
  } else {
    audio.pause();
    isPlaying = false;
  }

  updatePlayPauseIcon();
}

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % listMusic.length;
  loadSong(currentSongIndex);
  audio.play();
  isPlaying = true;
  
  updatePlayPauseIcon();
}


function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + listMusic.length) % listMusic.length;
  loadSong(currentSongIndex);
  audio.play();
  isPlaying = true;
  
  updatePlayPauseIcon();
}

function toggleRepeat() {
  repeatIcon.classList.toggle('active');
}

function playNextOrFirstSong() {
  if (repeatIcon.classList.contains('active')) {
    audio.currentTime = 0;
  } else {
    if (currentSongIndex === listMusic.length - 1) {
      currentSongIndex = 0;
    } else {
      currentSongIndex++;
    }
  }
  loadSong(currentSongIndex);
  audio.play();
  isPlaying = true;

  updatePlayPauseIcon();
}

function loadSong(index) {
  var music = listMusic[index];
  songName.textContent = music.name;
  artistName.textContent = music.artist;
  audio.src = music.path;

  audio.load();
}

audio.addEventListener('timeupdate', updateCurrentTime);
audio.addEventListener('timeupdate', updateSeekBar);
seekSlider.addEventListener('input', onSeekBarChange);
audio.addEventListener('durationchange', updateDuration);
audio.addEventListener('ended', playNextOrFirstSong);
playButton.addEventListener('click', playPause);
forwardButton.addEventListener('click', playNextSong);
backwardButton.addEventListener('click', playPreviousSong);
repeatIcon.addEventListener('click', toggleRepeat);

loadSong(currentSongIndex);