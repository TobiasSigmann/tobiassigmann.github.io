function getStoredValueForInputInt(storageName, defaultVlaue, input) {
    var value = parseInt(localStorage.getItem(storageName));
    if (value == null || isNaN(value)) value = defaultVlaue
    localStorage.setItem(storageName, value);

    input.value = value
    return value
}

function getStoredValueForInputFloat(storageName, defaultVlaue, input) {
    var value = parseFloat(localStorage.getItem(storageName));
    if (value == null || isNaN(value)) value = defaultVlaue
    localStorage.setItem(storageName, value);

    input.value = value
    return value
}

function getStoredValueForCheckBox(storageName, defaultVlaue, input) {
    var value = localStorage.getItem(storageName) == "true";
    if (value == null) value = defaultVlaue
    localStorage.setItem(storageName, value);

    input.checked = value
    return value
}

function getStoredIntValueForHTML(storageName, defaultVlaue, input) {
    var value = parseInt(localStorage.getItem(storageName));
    if (value == null || isNaN(value)) value = defaultVlaue
    localStorage.setItem(storageName, value);

    input.innerHTML = value
    return value
}

//###################################  Exercise control ###################################
const fisRB = document.getElementById("fis")
fisRB.onchange = function () {
    createNewContent();
};

const gesRB = document.getElementById("ges")
gesRB.onchange = function () {
    createNewContent();
};

const bothRB = document.getElementById("both")
bothRB.onchange = function () {
    createNewContent();
};

const hardcoreModeCB = document.getElementById("hardcore")
getStoredValueForCheckBox("hardCoreModeActive", false, hardcoreModeCB)
hardcoreModeCB.onchange = function () {
    createNewContent();
    localStorage.setItem("hardCoreModeActive", this.checked);
};

const amountInput = document.getElementById("amount")
getStoredValueForInputInt("amount", 1, amountInput)
amountInput.onchange = function () {
    localStorage.setItem("amount", amountInput.value);
    createNewContent();
};

const updateButton = document.getElementById("create")
updateButton.onclick = function () {
    createNewContent()
};

const fileDownloadButton = document.getElementById("download")

fileDownloadButton.onclick = function () {
    window.print()
};

const output = document.getElementById("output")

//################################### view control ###################################
const fontSizeInput = document.getElementById("fontsizeChanger")
var fontSize = getStoredValueForInputInt("fontsize", 25, fontSizeInput)
fontSizeInput.oninput = function () {
    fontSize = this.value
    localStorage.setItem("fontsize", fontSize);
    changefontSize()
}

const darkModeButton = document.getElementById("darkModeButton")
let darkMode = getStoredValueForCheckBox("darkMode", false, darkModeButton)
toggleDarkMode(darkMode)
darkModeButton.onclick = function () {
    toggleDarkMode(darkModeButton.checked)
    localStorage.setItem("darkMode", darkModeButton.checked);
};

//################################### metronom ###################################
const metronom = new Metronom()

const bpmdisplay = document.getElementById("bpmdisplay")
var bpm = getStoredIntValueForHTML("bpm", 150, bpmdisplay)
metronom.updateMetronomspeed(bpm)

const buttonUp = document.getElementById("buttonup")
buttonUp.onclick = function () {
    bpm += 1
    if (bpm > 300) bpm = 300
    bpmdisplay.innerHTML = bpm
    metronom.updateMetronomspeed(bpm)
    localStorage.setItem("bpm", bpm);
}

const buttonUp10 = document.getElementById("buttonup10")
buttonUp10.onclick = function () {
    bpm += 10
    if (bpm > 300) bpm = 300
    bpmdisplay.innerHTML = bpm
    metronom.updateMetronomspeed(bpm)
    localStorage.setItem("bpm", bpm);
}

const buttonDown = document.getElementById("buttondown")
buttonDown.onclick = function () {
    bpm -= 1
    if (bpm < 20) bpm = 20
    bpmdisplay.innerHTML = bpm
    metronom.updateMetronomspeed(bpm)
    localStorage.setItem("bpm", bpm);
}

const buttonDown10 = document.getElementById("buttondown10")
buttonDown10.onclick = function () {
    bpm -= 10
    if (bpm < 20) bpm = 20
    bpmdisplay.innerHTML = bpm
    metronom.updateMetronomspeed(bpm)
    localStorage.setItem("bpm", bpm);
}

const tabButton = document.getElementById("tap")
var lastTap = 0
tabButton.onclick = function toggleMetronom() {
    var d = new Date();
    var temp = parseInt(d.getTime(), 10);

    var bpmFromTap = Math.ceil(60000 / (temp - lastTap))
    lastTap = temp;

    if (bpmFromTap > 19 && bpmFromTap < 301) {
        bpm = bpmFromTap
        localStorage.setItem("bpm", bpmFromTap);
        document.getElementById("bpmdisplay").innerText = bpmFromTap
        metronom.updateMetronomspeed(bpmFromTap)
    }
}

const metronomStatusButton = document.getElementById("metronomstart")
const imageForPlayButtonElement = document.getElementById("imageForPlayButton")
metronomStatusButton.onclick = function toggleMetronom() {
    var state = metronom.contolState()
    if (state) {
        imageForPlayButtonElement.classList.remove("fa-play");
        imageForPlayButtonElement.classList.add("fa-stop");
    } else {
        imageForPlayButtonElement.classList.remove("fa-stop");
        imageForPlayButtonElement.classList.add("fa-play");
    }
}

const volumeSlider = document.getElementById("volumeSlider")
var volume = getStoredValueForInputFloat("metronomVolume", 0.5, volumeSlider)
metronom.setVolume(volume)
volumeSlider.oninput = function () {
    volume = this.value
    localStorage.setItem("metronomVolume", volume);
    metronom.setVolume(volume)
}

const lengthInput = document.getElementById("length")
var length = getStoredValueForInputInt("length", 4, lengthInput)
metronom.updateLength(length)
lengthInput.oninput = function () {
    length = this.value
    localStorage.setItem("length", length);
    metronom.updateLength(length)
}


const randomPauseMaxLengthInput = document.getElementById("maxlength")
var maxLength = getStoredValueForInputInt("maxlength", 2, randomPauseMaxLengthInput)
metronom.updateRandomMaxLength(maxLength)
randomPauseMaxLengthInput.oninput = function () {
    metronom.updateRandomMaxLength(this.value)
    localStorage.setItem("maxlength", this.value);
}

const randomPauseCheckbox = document.getElementById("randomPauseActivated")
var randompauseActive = getStoredValueForCheckBox("randomPauseActivated", false, randomPauseCheckbox)
metronom.activateRandomPause(randompauseActive)
randomPauseMaxLengthInput.disabled = !randompauseActive
randomPauseCheckbox.onchange = function () {
    metronom.activateRandomPause(this.checked)
    randomPauseMaxLengthInput.disabled = !this.checked
    localStorage.setItem("randomPauseActivated", this.checked);
};



/* 
const playForInput = document.getElementById("playFor")
var playFor = getStoredValueForInputInt("playFor", 4, playForInput)
metronom.playFor(playFor)
playForInput.oninput = function () {
    playFor = this.value
    localStorage.setItem("playFor", playFor);
    metronom.playFor(length)
}

const pauseForInput = document.getElementById("pauseFor")
var pauseFor = getStoredValueForInputInt("pauseFor", 1, pauseForInput)
metronom.pauseFor(pauseFor)
pauseForInput.oninput = function () {
    pauseFor = this.value
    localStorage.setItem("pauseFor", pauseFor);
    metronom.pauseFor(length)
}

const advancedEnabledCB = document.getElementById("advanced")
var advacedMetronom = getStoredValueForCheckBox("advanced", false, advancedEnabledCB)
playForInput.disabled = !advacedMetronom
pauseForInput.disabled = !advacedMetronom
metronom.enableAdvanced(advacedMetronom)
advancedEnabledCB.onclick = function () {
    advanced = this.checked
    localStorage.setItem("advanced", advanced);
    playForInput.disabled = !advanced
    pauseForInput.disabled = !advanced
    metronom.enableAdvanced(advanced)
} 
*/