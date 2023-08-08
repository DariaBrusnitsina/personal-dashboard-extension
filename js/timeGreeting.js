import * as CONST from "./constants.js"

function getTimeOfDay() {
    const date = new Date()
    const hours = date.getHours()

    if (hours > 5 && hours < 12) {
        return "morning"
    } else if (hours > 11 && hours < 18) {
        return "afternoon"
    } else if (hours > 17 && hours != 0) {
        return "evening"
    } else {
        return "night"
    }
}

function showDate() {
    const date = new Date()
    const lang = JSON.parse(localStorage.getItem("state")).language
    const options = {weekday: 'long', day: 'numeric', month: 'long'}
    const currentDate = lang === "en" ? date.toLocaleDateString('en-US', options) : date.toLocaleDateString('ru-RU', options)
    CONST.dateHTML.textContent = currentDate
}

function showGreeting() {
    const lang = JSON.parse(localStorage.getItem("state")).language
    const timeOfDay = getTimeOfDay()
    let greeting

    if (lang === "en") {
        CONST.name.placeholder = "[your name]"
        switch (timeOfDay) {
            case 'morning':
                greeting = "Good morning"
                break
            case "afternoon":
                greeting = "Good afternoon"
                break
            case "evening":
                greeting = "Good evening"
                break
            case "night":
                greeting = "Good night"
                break
        }
    } else {
        CONST.name.placeholder = "[ваше имя]"
        switch (timeOfDay) {
            case 'morning':
                greeting = "Доброе утро"
                break
            case "afternoon":
                greeting = "Добрый день"
                break
            case "evening":
                greeting = "Добрый вечер"
                break
            case "night":
                greeting = "Доброй ночи"
                break
        }
    }
    const greetingText = `${greeting},`
    CONST.greeting.textContent = greetingText
}

function showTime() {
    const date = new Date()
    const currentTime = date.toLocaleTimeString()
    setTimeout(showTime, 1000)
    CONST.time.textContent = currentTime
    showDate()
    showGreeting()
}

function onChange(e) {
    const name = e.target.value
    localStorage.setItem("name",JSON.stringify(name))
}

CONST.name.addEventListener("input", onChange)

export {getTimeOfDay, showTime, showGreeting, showDate}