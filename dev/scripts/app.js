function getStoredValueForInputInt(storageName, minValue, defaultVlaue, maxValue, inputElement, callback) {
    var value = parseInt(localStorage.getItem(storageName));
    if (value == null || isNaN(value)) value = defaultVlaue
    if (value < minValue) value = minValue
    if (value > maxValue) value = maxValue
    localStorage.setItem(storageName, value);

    inputElement.value = value
    inputElement.onchange = function () {
        let value = this.value
        if (value < minValue) value = minValue
        if (value > maxValue) value = maxValue

        console.log(storageName, "->", value)
        localStorage.setItem(storageName, value);
        callback(value);
    };

    return value
}

function getStoredValueForInputFloat(storageName, minValue, defaultVlaue, maxValue, inputElement, callback) {
    var value = parseFloat(localStorage.getItem(storageName));
    if (value == null || isNaN(value)) value = defaultVlaue
    if (value < minValue) value = minValue
    if (value > maxValue) value = maxValue
    localStorage.setItem(storageName, value);

    inputElement.value = value
    inputElement.onchange = function () {
        let value = this.value
        if (value < minValue) value = minValue
        if (value > maxValue) value = maxValue

        console.log(storageName, "->", value)
        localStorage.setItem(storageName, value);
        callback(value);
    };

    return value
}

function getStoredValueForCheckBox(storageName, defaultVlaue, inputElement, callback) {
    var valueString = localStorage.getItem(storageName);
    var value = valueString == "true"
    if (valueString == null) value = defaultVlaue
    localStorage.setItem(storageName, value);

    inputElement.checked = value
    inputElement.onchange = function () {
        console.log(storageName, "->", this.checked)
        localStorage.setItem(storageName, this.checked);
        callback(this.checked);
    };

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
const generator = new Generator()

const fisRB = document.getElementById("fis")
var fisChecked = getStoredValueForCheckBox("fis", true, fisRB,
    function (value) {
        if (value) {
            generator.setMode(0)
            generator.createNewContent();
        }
    }
)
fisRB.checked = fisChecked

const gesRB = document.getElementById("ges")
var gesChecked = getStoredValueForCheckBox("ges", false, gesRB,
    function (value) {
        if (value) {
            generator.setMode(1)
            generator.createNewContent();
        }
    }
)
gesRB.checked = gesChecked

const bothRB = document.getElementById("both")
var bothChecked = getStoredValueForCheckBox("both", false, bothRB,
    function (value) {
        if (value) {
            generator.setMode(2)
            generator.createNewContent();
        }
    }
)
bothRB.checked = bothChecked

const hardcoreModeCB = document.getElementById("hardcore")
getStoredValueForCheckBox("hardCoreModeActive", false, hardcoreModeCB,
    function (value) {
        generator.setHardcore(value)
        generator.createNewContent();
    }
)

const amountInput = document.getElementById("amount")
getStoredValueForInputInt("amount", 1, 1, 500, amountInput,
    function (value) {
        generator.setAmount(value)
        generator.createNewContent();
    }
);

const updateButton = document.getElementById("create")
updateButton.onclick = function () {
    generator.createNewContent()
};

const fileDownloadButton = document.getElementById("download")

fileDownloadButton.onclick = function () {
    window.print()
};

const output = document.getElementById("output")

//################################### view control ###################################
const fontSizeInput = document.getElementById("fontsizeChanger")
var fontSize = getStoredValueForInputInt("fontsize", 10, 25, 80, fontSizeInput,
    function (value) {
        fontSize = value
        changefontSize()
    }
)

const darkModeButton = document.getElementById("darkModeButton")
let darkMode = getStoredValueForCheckBox("darkMode", false, darkModeButton,
    function (value) {
        toggleDarkMode(value)
    }
)
toggleDarkMode(darkMode)

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
var volume = getStoredValueForInputFloat("metronomVolume", 0, 0.5, 1, volumeSlider,
    function (value) {
        metronom.setVolume(value)
    }
)
metronom.setVolume(volume)

const lengthInput = document.getElementById("length")
var length = getStoredValueForInputInt("length", 1, 4, 100, lengthInput,
    function (value) {
        metronom.updateLength(value)
    }
)
metronom.updateLength(length)

const randomPauseMaxLengthInput = document.getElementById("maxlength")
var maxLength = getStoredValueForInputInt("maxlength", 1, 2, 100, randomPauseMaxLengthInput,
    function (value) {
        metronom.updateRandomMaxLength(value)
    }
)
metronom.updateRandomMaxLength(maxLength)

const randomPauseCheckbox = document.getElementById("randomPauseActivated")
var randompauseActive = getStoredValueForCheckBox("randomPauseActivated", false, randomPauseCheckbox,
    function (value) {
        metronom.activateRandomPause(value)
        randomPauseMaxLengthInput.disabled = !value
    }
)
metronom.activateRandomPause(randompauseActive)
randomPauseMaxLengthInput.disabled = !randompauseActive

/* 
const playForInput = document.getElementById("playFor")
var playFor = getStoredValueForInputInt("playFor", 1, 4, 100, playForInput,
    function (value) {
        metronom.playFor(value)
    }
)
metronom.playFor(playFor)

const pauseForInput = document.getElementById("pauseFor")
var pauseFor = getStoredValueForInputInt("pauseFor", 1, 1, 100 pauseForInput,
    function (value) {
        metronom.pauseFor(value)
    }
)
metronom.pauseFor(pauseFor)

const advancedEnabledCB = document.getElementById("advanced")
var advacedMetronom = getStoredValueForCheckBox("advanced", false, advancedEnabledCB)
playForInput.disabled = !advacedMetronom
pauseForInput.disabled = !advacedMetronom
metronom.enableAdvanced(advacedMetronom)
advancedEnabledCB.onclick = function () {
    advanced = this.checked
    playForInput.disabled = !advanced
    pauseForInput.disabled = !advanced
    metronom.enableAdvanced(advanced)
} 
*/