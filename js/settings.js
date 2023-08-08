import {getWeather, getTimeOfDay, randomNum} from "./script.js";
import {getLinkToImage, setBg, setBgfromSourse} from "./bg.js"
import * as CONST from "./constants.js"

let menuClose = true

if (menuClose) {
    document.querySelector(".settings-menu").style.display = "none"
    document.querySelector(".settings-btn").style.opacity = 1
}
const state = {
    language: 'en',
    photoSource: 'github',
    selectedTag: "",
    blocks: ['time', 'date', 'greeting', 'quote', 'weather', 'audio', 'todolist'],
    todos: ['Edit your email', 'Create an app', 'Buy some apples']
}

async function translateQuote() {
    const lang = JSON.parse(localStorage.getItem("state")).language
    const quotesFin = lang === "en" ? 'dataEN.json' : 'dataRU.json'
    const quotesInit = lang === "en" ? 'dataRU.json' : 'dataEN.json'

    const res = await fetch(quotesInit);
    const init = await res.json();

    const res2 = await fetch(quotesFin);
    const fin = await res2.json();
    for (let q in init) {
        if(CONST.quote.textContent === Object.values(init[q])[0]) {
            CONST.quote.textContent = Object.values(fin[q])[0]
            CONST.author.textContent = Object.values(fin[q])[1]
        }
    }
}

function languageSettingConfig() {
    const lang = JSON.parse(localStorage.getItem("state")).language

    document.querySelector('.lang-settings').textContent = lang === "en" ? "Language:" : "Язык приложения:"
    document.querySelector(".sourse-settings").textContent = lang === "en" ? "Sourse:" : "Источник фото:"
    document.querySelector(".tegAPI-label").textContent = lang === "en" ? "Photo request tag:" : "Запрос фото по тэгу:"
    document.querySelector(".settings-display-title").textContent = lang === "en" ? "Display blocks:" : "Отображаемые блоки:"
    document.querySelector(".input-todo").placeholder = lang === "en" ? "Add a new task..." : "Добавить задачу..."

    document.querySelector(".label-time").textContent = lang === "en" ? "Time" : "Время"
    document.querySelector(".label-date").textContent = lang === "en" ? "Date" : "Дата"
    document.querySelector(".label-greeting").textContent = lang === "en" ? "Greeting" : "Приветствие"
    document.querySelector(".label-quote").textContent = lang === "en" ? "Quote" : "Цитата"
    document.querySelector(".label-weather").textContent = lang === "en" ? "Weather" : "Погода"
    document.querySelector(".label-audio").textContent = lang === "en" ? "Audio" : "Плеер"
    document.querySelector(".label-todolist").textContent = lang === "en" ? "To-do list" : "Список дел"
}

function changeLanguage(e) {
    const config = JSON.parse(localStorage.getItem("state"))
    config.language = e.target.textContent.toLowerCase()
    localStorage.setItem("state",JSON.stringify(config))
    getWeather()
    translateQuote()
    languageSettingConfig()
}

function onSubmit(e) {
    e.preventDefault();
    const value = CONST.log.value
    const config = JSON.parse(localStorage.getItem("state"))
    config.selectedTag = value
    localStorage.setItem("state",JSON.stringify(config))

    if (value === "") {
        getLinkToImage(getTimeOfDay())

    } else {
        getLinkToImage(value)
    }
}

function onChange(e) {
    if (e.target.type === "checkbox") {
        const config = JSON.parse(localStorage.getItem("state"))

        if (e.target.checked) {
            config.blocks.push(e.target.id)
            localStorage.setItem("state",JSON.stringify(config))

        } else {
            const newConfig = config.blocks.filter(block => block != e.target.id)
            config.blocks = newConfig
            localStorage.setItem("state",JSON.stringify(config))
        }
    }
    toDisplayBlock()
}

function toDisplayBlock() {
    const array = JSON.parse(localStorage.getItem("state")).blocks

    CONST.displayBlock.forEach(el => {
        if (array.includes(el.id)) {
            el.checked = true
        }
    })

    if (array) {
        CONST.blocks.forEach(block => {
            if (array.includes(block.id)) {
                block.style.opacity = 1
            } else {
                block.style.opacity = 0
            }
        })
    }
}

function displayTag() {
    const sourse = JSON.parse(localStorage.getItem("state")).photoSource
    if (sourse === "github") {
        CONST.tegAPI.style.display = "none"
    } else {
        CONST.tegAPI.style.display = "block"
    }
}

function toggleMenu(e) {
    if (e.target.classList.value === "settings-btn") {
        menuClose = false
        document.querySelector(".settings-menu").style.display = "block"
        document.querySelector(".settings-btn").style.opacity = 0

    } else if (e.target.classList.value === "settings-menu__close") {
        menuClose = true
        document.querySelector(".settings-menu").style.display = "none"
        document.querySelector(".settings-btn").style.opacity = 1
    }
}

function selectSourse(e) {
    if (e.target.textContent === "GitHub") {
        const config = JSON.parse(localStorage.getItem("state"))
        config.photoSource = "github"
        localStorage.setItem("state",JSON.stringify(config))
        displayTag()
        setBgfromSourse()
        // setBg(getTimeOfDay(),randomNum)
    } else if (e.target.textContent === "API"){
        const config = JSON.parse(localStorage.getItem("state"))
        config.photoSource = "api"
        localStorage.setItem("state",JSON.stringify(config))
        displayTag()
        setBgfromSourse()

    }
}

CONST.tegAPI.addEventListener("submit", onSubmit)
CONST.display.addEventListener("change", onChange)

document.querySelector(".settings-menu__close").addEventListener("click", toggleMenu)
document.querySelector(".settings-btn").addEventListener("click", toggleMenu)
CONST.sourseAPI.addEventListener("click", selectSourse)
CONST.sourseGitHub.addEventListener("click", selectSourse)


export {displayTag, state, changeLanguage, toDisplayBlock, languageSettingConfig}
