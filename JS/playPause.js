const playPauseButton = document.getElementById('play-pause');

playPauseButton.addEventListener('click', function() {
  if (playPauseButton.classList.contains('fa-play')) {
    playPauseButton.classList.remove('fa-play');
    playPauseButton.classList.add('fa-pause');
  } else {
    playPauseButton.classList.remove('fa-pause');
    playPauseButton.classList.add('fa-play');
  }
});