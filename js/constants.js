
const time = document.querySelector('.time')
const dateHTML = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const city = document.querySelector('.city')

//quote
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')

//player
const play = document.querySelector('.play')
const playListHTML = document.querySelector('.play-list')
const playPrevBtn = document.querySelector('.play-prev')
const playNextBtn = document.querySelector('.play-next')
const musicName = document.querySelector('.music-name')
const length = document.querySelector('.length')
const timeline = document.querySelector('.timeline')
const progressBar = document.querySelector(".progress");
const volumeBtn = document.querySelector(".volume-button")
const volumeSlider = document.querySelector(".volume-slider");
const volumePercentage = document.querySelector(".volume-percentage")

///Weather
const weatherError = document.querySelector('.weather-error')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')

const langRU = document.querySelector(".lang-ru")
const langEN = document.querySelector(".lang-en")
const sourseGitHub = document.querySelector(".sourse-git")
const sourseAPI = document.querySelector(".sourse-api")
const sourseURL = document.querySelector(".sourse-url")
const tegAPI = document.querySelector(".tegAPI")
const log = document.querySelector(".log")
const displayBlock = document.querySelectorAll(".settings-display-block")
const display = document.querySelector(".settings-display")
const blocks = document.querySelectorAll(".block")



export {blocks, display, displayBlock, log, tegAPI, sourseURL, sourseGitHub, sourseAPI, volumePercentage, volumeSlider, volumeBtn, progressBar, timeline, length, musicName, langEN, langRU, time, greeting, dateHTML, name, city, weatherError, wind, humidity, weatherIcon, temperature, weatherDescription, quote, author, play, playListHTML, playPrevBtn, playNextBtn}