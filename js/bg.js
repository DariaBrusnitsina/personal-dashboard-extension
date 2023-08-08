import {getTimeOfDay, getRandomNum} from "./script.js";

let randomNum = getRandomNum(1, 20)

document.querySelector('.slide-next').addEventListener('click', getSlideNext)
document.querySelector('.slide-prev').addEventListener('click', getSlidePrev)

function setBg(timeOfDay, bgNum) {
    const num = String(bgNum).padStart(2,"0")
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${num}.jpg`
    img.onload = () => {
        document.querySelector("body").style.backgroundImage = `url(${img.src})`
    }
}

function setBgfromSourse() {
    const sourse = JSON.parse(localStorage.getItem("state")).photoSource

    if (sourse === "github") {
        setBg(getTimeOfDay(), randomNum)

    } else {
        if (JSON.parse(localStorage.getItem("state")).selectedTag) {
            getLinkToImage(JSON.parse(localStorage.getItem("state")).selectedTag)
        } else {
            getLinkToImage(getTimeOfDay())
        }

    }
}

function getSlideNext() {
    const sourse = JSON.parse(localStorage.getItem("state")).photoSource

    if (sourse === "github") {
        randomNum === 20 ? randomNum = 1 : randomNum++
        setBg(getTimeOfDay(),randomNum)
    } else {
        if (JSON.parse(localStorage.getItem("state")).selectedTag) {
            getLinkToImage(JSON.parse(localStorage.getItem("state")).selectedTag)
        } else {
            getLinkToImage(getTimeOfDay())
        }
    }
}

function getSlidePrev() {
    const sourse = JSON.parse(localStorage.getItem("state")).photoSource

    if (sourse === "github") {
        randomNum === 1 ? randomNum = 20 : randomNum--
        setBg(getTimeOfDay(),randomNum)
    } else {
        if (JSON.parse(localStorage.getItem("state")).selectedTag) {
            getLinkToImage(JSON.parse(localStorage.getItem("state")).selectedTag)
        } else {
            getLinkToImage(getTimeOfDay())
        }
    }
}

async function getLinkToImage(tag) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=51520fe4aa9c569f4f803586b71f8736&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    const src = data.photos.photo[getRandomNum(0,100)].url_l
    document.querySelector("body").style.backgroundImage = `url(${src})`
}


export {getLinkToImage, setBgfromSourse, setBg}
