console.log("Welcome to Spotify");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio('0.mp3');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.querySelector('.masterSongName');
let masterPlay = document.getElementById('masterPlay');
let songItems = Array.from(document.querySelectorAll('.songItem'));

let song = [
    { songName: "Hasta hua ", filePath: "hasta.mp3", coverPath: "hasta.jpg" },
    { songName: "Enemy", filePath: "enemy.mp3", coverPath: "cover2.jpg" },
    { songName: "sia-unstoppable", filePath: "un.mp3", coverPath: "un.jpg" },
    { songName: "Thunder", filePath: "thunder.mp3", coverPath: "cover3.jpg" },
    { songName: "Bones", filePath: "bones.mp3", coverPath: "c4.jpg" },
];

// Update song items in the UI
songItems.forEach((element, i) => {
    let imgElement = element.querySelector("img");
    if (imgElement) {
        imgElement.src = song[i].coverPath;
    }
    let songNameElement = element.querySelector(".songName");
    if (songNameElement) {
        songNameElement.innerText = song[i].songName;
    }
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0;
    }
});

// Update progress bar during audio time update
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Handle change in progress bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Function to make all plays inactive
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
};

// Handle song item play click
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `${songIndex}.mp3`;
        masterSongName.innerText = song[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
    });
});

// Handle next button click
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % song.length;
    audioElement.src = `${songIndex}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
});

// Handle previous button click
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + song.length) % song.length;
    audioElement.src = `${songIndex}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
});
