import * as CONST from "./constants.js"
import playList from '../playList.js';
import {tracks, playListBtn} from "./script.js"

let isPlay = false
let playNum = 0
const audio = new Audio();

// Functions
setInterval(() => {
    CONST.progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    document.querySelector(".current").textContent = getTimeCodeFromNum(
      audio.currentTime
    )
    if (audio.currentTime === audio.duration) {
        playNext()
    }
}, 500);

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
}

function playAudio() {
    if (isPlay) {
        isPlay = false
        CONST.play.classList.remove('pause')
        audio.pause()
    } else {
        isPlay = true
        CONST.play.classList.add('pause')
        CONST.musicName.textContent = playList[playNum].title
        CONST.length.textContent = playList[playNum].duration
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();

        tracks.forEach(track => {
            track.classList.remove("active")
            if (track.textContent === playList[playNum].title) {
                track.classList.add("active")
            }
        })
    }
}

function playNext() {
    isPlay = false
    playNum === playList.length-1 ? playNum = 0 : playNum++
    playAudio()
}

function playPrev() {
    isPlay = false
    playNum === 0 ? playNum = playList.length-1 : playNum--
    playAudio()
}

function selectTrack(e) {
    console.log(e.target.textContent)
    if (e.target.textContent === "⏸️") {
        isPlay =  true
        playAudio()
        e.target.textContent = "▶️"
    } else {
        playList.forEach(el => {
            if (el.title === e.target.textContent || e.target.parentNode.querySelector("p").textContent === el.title) {
                playListBtn.forEach(el => el.textContent ="▶️")
                e.target.parentNode.querySelector("button").textContent ="⏸️"
                isPlay = false
                playNum = playList.indexOf(el)
                playAudio()
            }
        })
    }
}

function selectPiece(e) {
    const timelineWidth = window.getComputedStyle(CONST.timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}

let saveState
CONST.volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(CONST.volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  saveState = audio.volume
  CONST.volumePercentage.style.width = newVolume * 100 + '%';
}, false)

CONST.volumeBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    if (audio.muted) {
      saveState = audio.volume
      CONST.volumeBtn.textContent = "🔇"
      CONST.volumePercentage.style.width = 0 + '%';
    } else {
      CONST.volumeBtn.textContent = "🔈"
      CONST.volumePercentage.style.width = saveState * 100 + '%';
    }
});


export {playAudio, playNext, playPrev, selectTrack, selectPiece}