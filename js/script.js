import playList from '../playList.js';
import * as CONST from "./constants.js"
import { state, changeLanguage, toDisplayBlock, languageSettingConfig, displayTag} from "./settings.js"
import {getTimeOfDay, showTime} from "./timeGreeting.js"
import {playAudio, playNext, playPrev, selectTrack, selectPiece} from "./player.js"
import {onSubmitTodo, createTodos} from "./todolist.js"
import {setBgfromSourse} from "./bg.js"

let randomNum = getRandomNum(1, 20)
function getRandomNum(min, max) {
    return Math.floor((Math.random() * (max - min) + min))
}

if (!localStorage.getItem("state")) {
    localStorage.setItem("state",JSON.stringify(state))
    toDisplayBlock()
    displayTag()
    createTodos()
    setBgfromSourse()
    CONST.log.value = JSON.parse(localStorage.getItem("state")).selectedTag
} else {
    toDisplayBlock()
    displayTag()
    createTodos()
    setBgfromSourse()
    CONST.log.value = JSON.parse(localStorage.getItem("state")).selectedTag
}
languageSettingConfig()


if (localStorage.getItem("name")) {
    CONST.name.value = JSON.parse(localStorage.getItem("name"))
}

if (localStorage.getItem("city")) {
    CONST.city.value = JSON.parse(localStorage.getItem("city"))
}

const changeQuote = document.querySelector('.change-quote')

playList.forEach(el => {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    const p = document.createElement('p')
    btn.classList.add('playListBtn')
    p.classList.add('play-item')
    li.classList.add('play-items')

    btn.textContent = "▶️"
    p.textContent= el.title
    li.append(btn, p)
    CONST.playListHTML.append(li)
})
const tracks = document.querySelectorAll(".play-item")
const playListBtn = document.querySelectorAll('.playListBtn')

async function getWeather() {
    const lang = JSON.parse(localStorage.getItem("state")).language
    let defaulCity = lang === "en" ? "Minsk" : "Минск"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CONST.city.value ? CONST.city.value : CONST.city.value = defaulCity}&lang=${lang}&appid=e3696b15f0711ae33ce13bd96c5c92af&units=metric`
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod != "404") {
        CONST.weatherError.textContent = ""
        CONST.weatherIcon.style.display = "block"
        CONST.weatherIcon.className = 'weather-icon owf'
        CONST.weatherIcon.classList.add(`owf-${data.weather[0].id}`)
        CONST.temperature.textContent = `${Math.round(data.main.temp)}°C`
        CONST.weatherDescription.textContent = data.weather[0].description
        CONST.humidity.textContent = `${lang === "en" ? "Humidity" : "Влажность"}: ${data.main.humidity}%`
        CONST.wind.textContent = `${lang === "en" ? "Wind" : "Скорость ветра"}: ${Math.round(data.wind.speed)}${lang === "en" ? "m/s" : "м/с"}`
        localStorage.setItem("city",JSON.stringify(CONST.city.value))
    } else {
        const lang = JSON.parse(localStorage.getItem("state")).language
        CONST.weatherError.textContent = lang === "en" ? "City not found" : "Город не найден"

        CONST.weatherIcon.style.display = "none"
        CONST.temperature.textContent = ""
        CONST.weatherDescription.textContent = ""
        CONST.humidity.textContent = ""
        CONST.wind.textContent = ""
    }
}

async function getQuotes() {
    const lang = JSON.parse(localStorage.getItem("state")).language
    const quotes = lang === "en" ? 'dataEN.json' : 'dataRU.json'
    const res = await fetch(quotes);
    const data = await res.json();
    const randomQuote = data[getRandomNum(0, data.length)]
    CONST.quote.textContent = randomQuote.text
    CONST.author.textContent = randomQuote.author
}

// Events
CONST.city.addEventListener('change', getWeather)
changeQuote.addEventListener('click', getQuotes)

CONST.langRU.addEventListener("click", changeLanguage)
CONST.langEN.addEventListener("click", changeLanguage)

CONST.play.addEventListener('click', playAudio)
CONST.playPrevBtn.addEventListener('click', playPrev)
CONST.playNextBtn.addEventListener('click', playNext)
CONST.timeline.addEventListener("click", selectPiece)
CONST.playListHTML.addEventListener("click", selectTrack)


// Call
showTime()
getQuotes()
getWeather()
document.querySelector(".todo-form").addEventListener("submit", onSubmitTodo)


export {getTimeOfDay, getWeather, getQuotes, tracks, playListBtn, randomNum, getRandomNum}

