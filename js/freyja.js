// ===================================================================
// player behavior fuckery
// implement the calls and all the functions of the actual app
// good luck to open subs?
//
// Freyja is supposed to take care of all this fuckery and magik
// and perhaps made this pirateflix clone work with easy
// but idk, shes kinda mad at me now?
//
// Mimir is the worker behind the player interface and the main app
// itself. Respect my truta
// 
// ===================================================================


//  Automagic pick the desired movie and update the page to refer to it
//  removing the necessity to create thousands of new pages

//var movieSource = document.getElementById("videoSrc");
//var movieSource = document.querySelector('.video-container video')
//pathString = "C:\Users\Matheus\Desktop\MIMIR\tests\test.mp4";
//pathString = pathString.replace(/\\/g,"/");
//movieSource.firstChild.firstChild.nodeValue = pathString;



//  Main declarations and fuckery
const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-container video');
const controlsContainer = document.querySelector('.video-container .controls-container');
const playPauseButton = document.querySelector('.video-container .controls button.play');
const rewindButton = document.querySelector('.video-container .controls button.rewind');
const fastForwardButton = document.querySelector('.video-container .controls button.fast-forward');
const volumeButton = document.querySelector('.video-container .controls button.volume');
const fullScreenButton = document.querySelector('.video-container .controls button.fullscreen');
const playButton = playPauseButton.querySelector('.playing');
const pauseButton = playPauseButton.querySelector('.paused');
const fullVolumeButton = volumeButton.querySelector('.full-volume');
const mutedButton = volumeButton.querySelector('.muted');
const maximizeButton = fullScreenButton.querySelector('.maximize');
const minimizeButton = fullScreenButton.querySelector('.minimize');
const progressBar = document.querySelector('.video-container .progress-controls .progress-bar');
const watchedBar = document.querySelector('.video-container .progress-controls .progress-bar .watched-bar');
const timeLeft = document.querySelector('.video-container .progress-controls .time-remaining');

//  subs handler
//  SUCH FUCKERY WOW
//  BROKEN AF DUDE
const subs = document.querySelector('.video-container .video .subtitles')
var subtitles = document.getElementById('subtitles');



//  automagic hide controls
let controlsTimeout;
controlsContainer.style.opacity = '0';
watchedBar.style.width = '0px';
pauseButton.style.display = 'none';
minimizeButton.style.display = 'none';

const displayControls = () => {
  controlsContainer.style.opacity = '1';
  document.body.style.cursor = 'initial';
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
  }
  controlsTimeout = setTimeout(() => {
    controlsContainer.style.opacity = '0';
    document.body.style.cursor = 'none';
  }, 5000);
};

//  play action
const playPause = () => {
  if (video.paused) {
    video.play();
    playButton.style.display = 'none';
    pauseButton.style.display = '';
  } else {
    video.pause();
    playButton.style.display = '';
    pauseButton.style.display = 'none';
  }
};

//  mute action
const toggleMute = () => {
  video.muted = !video.muted;
  if (video.muted) {
    fullVolumeButton.style.display = 'none';
    mutedButton.style.display = '';
  } else {
    fullVolumeButton.style.display = '';
    mutedButton.style.display = 'none';
  }
};

//  full screen action
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    maximizeButton.style.display = '';
    minimizeButton.style.display = 'none';
  } else {
    maximizeButton.style.display = 'none';
    minimizeButton.style.display = '';
  }
});


//  key press prototype fuckery
document.addEventListener('keyup', (event) => {
  //  plays/resumes source
  if (event.code === 'Space') {
    playPause();
  }

  //  mute/desmute audio
  if (event.code === 'KeyM') {
    toggleMute();
  }

  //  fullscreen toggle
  if (event.code === 'KeyF') {
    toggleFullScreen();
  }

  //  forward video implementation
  //  NOT WORKING YET
  if(event.code === 'Left') {
    fastForwardButton();
  }

  //  rewind implementation 
  //  NOT WORKING YET
  if(event.code === 'Left') {
    rewindButton();
  }

  //  automatic shows the controls if you press any action
  displayControls();
});

//  if the mouse moves, the controls are showed again
document.addEventListener('mousemove', () => {
  displayControls();
});

//  very poor implementation of time sync
video.addEventListener('timeupdate', () => {
  watchedBar.style.width = ((video.currentTime / video.duration) * 100) + '%';
  const totalSecondsRemaining = video.duration - video.currentTime;
  const time = new Date(null);

  time.setSeconds(totalSecondsRemaining);

  let hours = null;

  if (totalSecondsRemaining >= 3600) {
    hours = (time.getHours().toString()).padStart('2', '0');
  }

  let minutes = (time.getMinutes().toString()).padStart('2', '0');
  let seconds = (time.getSeconds().toString()).padStart('2', '0');

  timeLeft.textContent = `${hours ? hours : '00'}:${minutes}:${seconds}`;
});

//  progress bar listener to
//  handle the time and navigate through the source
progressBar.addEventListener('click', (event) => {
  const pos = (event.pageX - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;
  video.currentTime = pos * video.duration;
});

//  pause and resume the source with the mouse click
playPauseButton.addEventListener('click', playPause);

//  rewind the source by 10 seconds
rewindButton.addEventListener('click', () => {
  let time = 10;
  video.currentTime -= time;
});

//  forward the source by 10 seconds
fastForwardButton.addEventListener('click', () => {
  let time = 10;
  video.currentTime += time;
});

//  mute sound
volumeButton.addEventListener('click', toggleMute);

// full screen enter/exit
fullScreenButton.addEventListener('click', toggleFullScreen);