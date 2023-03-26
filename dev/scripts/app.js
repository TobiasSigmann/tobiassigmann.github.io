//###################################  Exercise control ###################################
const fisRB = document.getElementById("fis")
const gesRB = document.getElementById("ges")
const bothRB = document.getElementById("both")
const hardcoreModeCB = document.getElementById("hardcore")
const amountInput = document.getElementById("amount")
const updateButton = document.getElementById("create")
const fileDownloadButton = document.getElementById("download")
const output = document.getElementById("output")

//---- set start condition ----
var amount = localStorage.getItem("amount");
if (amount == null) amount = 1
amountInput.value = amount
localStorage.setItem("amount", amount);

//---- action handler ---
amountInput.onchange = function () {
    localStorage.setItem("amount", amountInput.value);
    createNewContent();
};
fisRB.onchange = function () {
    createNewContent();
};
gesRB.onchange = function () {
    createNewContent();
};
bothRB.onchange = function () {
    createNewContent();
};
hardcoreModeCB.onchange = function () {
    createNewContent();
};
updateButton.onclick = function () {
    createNewContent()
};
fileDownloadButton.onclick = function () {
    window.print()
};


//################################### view control ###################################
const fontSizeInput = document.getElementById("fontsizeChanger")
const darkModeButton = document.getElementById("darkModeButton")

//---- set start condition ----
var fontSize = localStorage.getItem("fontsize");
if (fontSize == null) fontSize = 25
fontSizeInput.value = fontSize
localStorage.setItem("fontsize", fontSize);

var darkMode = localStorage.getItem("darkMode") == "true";
if (darkMode == null) darkMode = false
darkModeButton.checked = darkMode
toggleDarkMode(darkMode)
localStorage.setItem("darkMode", darkMode);


//---- action handler ---
// Update the current slider value (each time you drag the slider handle)
fontSizeInput.oninput = function () {
    fontSize = this.value
    localStorage.setItem("fontsize", fontSize);
    changefontSize()
}

darkModeButton.onclick = function () {
    toggleDarkMode(darkModeButton.checked)
    localStorage.setItem("darkMode", darkModeButton.checked);
};

//################################### metronom ###################################
const tabButton = document.getElementById("tap")
const metronomStatusButton = document.getElementById("metronomstart")
const imageForPlayButtonElement = document.getElementById("imageForPlayButton")
const lengthInput = document.getElementById("length")
const advancedEnabledCB = document.getElementById("advanced")
const playForInput = document.getElementById("playFor")
const pauseForInput = document.getElementById("pauseFor")
const bpmdisplay = document.getElementById("bpmdisplay")
const volumeSlider = document.getElementById("volumeSlider")
const buttonUp = document.getElementById("buttonup")
const buttonDown = document.getElementById("buttondown")
const buttonUp10 = document.getElementById("buttonup10")
const buttonDown10 = document.getElementById("buttondown10")
const metronom = new Metronom()

//---- set start condition ----
var bpm = parseInt(localStorage.getItem("bpm"));
if (bpm == null) bpm = 150
bpmdisplay.innerHTML = bpm
metronom.updateMetronomspeed(bpm)
localStorage.setItem("bpm", bpm);

var length = localStorage.getItem("length");
if (length == null) length = 4
lengthInput.value = length
metronom.updateLength(length)
localStorage.setItem("length", length);

var advanced = localStorage.getItem("advanced") == 'true';
if (advanced == null) advanced = false
advancedEnabledCB.checked = advanced
playForInput.disabled = !advanced
pauseForInput.disabled = !advanced
metronom.enableAdvanced(advanced)
localStorage.setItem("advanced", advanced);

var playFor = localStorage.getItem("playFor");
if (playFor == null) playFor = 4
playForInput.value = playFor
metronom.playFor(playFor)
localStorage.setItem("playFor", playFor);

var pauseFor = localStorage.getItem("pauseFor");
if (pauseFor == null) pauseFor = 1
pauseForInput.value = pauseFor
metronom.pauseFor(pauseFor)
localStorage.setItem("pauseFor", pauseFor);

var volume = localStorage.getItem("volume");
if (volume == null) volume = 0.5
volumeSlider.value = volume
metronom.setVolume(volume)
localStorage.setItem("volume", volume);

//---- action handler ---
buttonUp.onclick = function () {
    bpm += 1
    if (bpm > 300) bpm = 300
    bpmdisplay.innerHTML = bpm
    metronom.updateMetronomspeed(bpm)
    localStorage.setItem("bpm", bpm);
}

buttonDown.onclick = function () {
    bpm -= 1
    if (bpm < 20) bpm = 20
    bpmdisplay.innerHTML = bpm
    metronom.updateMetronomspeed(bpm)
    localStorage.setItem("bpm", bpm);
}

buttonUp10.onclick = function () {
    bpm += 10
    if (bpm > 300) bpm = 300
    bpmdisplay.innerHTML = bpm
    metronom.updateMetronomspeed(bpm)
    localStorage.setItem("bpm", bpm);
}

buttonDown10.onclick = function () {
    bpm -= 10
    if (bpm < 20) bpm = 20
    bpmdisplay.innerHTML = bpm
    metronom.updateMetronomspeed(bpm)
    localStorage.setItem("bpm", bpm);
}

lengthInput.oninput = function () {
    length = this.value
    localStorage.setItem("length", length);
    metronom.updateLength(length)
}

playForInput.oninput = function () {
    playFor = this.value
    localStorage.setItem("playFor", playFor);
    metronom.playFor(length)
}

pauseForInput.oninput = function () {
    pauseFor = this.value
    localStorage.setItem("pauseFor", pauseFor);
    metronom.pauseFor(length)
}

advancedEnabledCB.onclick = function () {
    advanced = this.checked
    localStorage.setItem("advanced", advanced);
    playForInput.disabled = !advanced
    pauseForInput.disabled = !advanced
    metronom.enableAdvanced(advanced)
}

metronomStatusButton.onclick = function toggleMetronom() {
    var state = metronom.contolState()
    console.log(state)
    if (state) {
        imageForPlayButtonElement.classList.remove("fa-play");
        imageForPlayButtonElement.classList.add("fa-stop");
    } else {
        imageForPlayButtonElement.classList.remove("fa-stop");
        imageForPlayButtonElement.classList.add("fa-play");
    }
}

var lastTap = 0
tabButton.onclick = function toggleMetronom() {
    var d = new Date();
    var temp = parseInt(d.getTime(), 10);

    var bpmFromTap = Math.ceil(60000 / (temp - lastTap))
    lastTap = temp;

    if (bpmFromTap > 19 && bpmFromTap < 301){
        bpm = bpmFromTap
        localStorage.setItem("bpm", bpmFromTap);
        document.getElementById("bpmdisplay").innerText = bpmFromTap
        metronom.updateMetronomspeed(bpmFromTap)
    }
}

volumeSlider.oninput = function () {
    volume = this.value
    localStorage.setItem("volume", volume);
    metronom.setVolume(volume)
}

//initial creation
createNewContent()