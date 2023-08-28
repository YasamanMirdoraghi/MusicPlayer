
const image = document.querySelector("#cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const background = document.getElementById("background");

// Music
const songs = [
  {
    path:"media/0.mp3",
    displayName: "Khab Nabashim",
    artist: "Shaye",
    cover:"https://cdn.nody.ir/files/2021/10/02/nody-%D8%B9%DA%A9%D8%B3-%D8%A7%D8%B3%DA%A9%D9%84%D8%AA-%D8%AE%D9%81%D9%86-%D9%BE%D8%B3%D8%B1%D8%A7%D9%86%D9%87-1633167566.jpg"
  },
  {
    path: "media/1.mp3",
    displayName: "Bazam Kalan",
    artist: "Hichkas va Reza Pishro",
    cover: "https://picopics.ir/wp-content/uploads/2022/06/%D9%BE%D8%B1%D9%88%D9%81%D8%A7%DB%8C%D9%84-%DA%AF%D9%86%DA%AF-%D9%88-%D9%84%D8%A7%D8%AA%DB%8C-%D9%BE%D8%B3%D8%B1%D8%A7%D9%86%D9%87_26.jpg",
  },
  {
    path:"media/2.mp3",
    displayName: "Crusham Toei ",
    artist: "Sepehr Khalse",
    cover:"https://www.mapsofindia.com/ci-moi-images/my-india/2021/10/IMG-20211018-WA0023.jpg",
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", function () {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

// Update DOM
function loadSong(song) {
  console.log(song);
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = song.path;
  changeCover(song.cover);
}

function changeCover(cover) {
  image.classList.remove("active");
  setTimeout(() => {
    image.src = cover;
    image.classList.add("active");
  }, 100);
  background.src = cover;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = durationMinutes + ":" + durationSeconds;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
