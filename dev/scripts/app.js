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


//################################### view control ###################################
const fontSizeInput = document.getElementById("fontsizeChanger")
const darkModeButton = document.getElementById("darkModeButton")

//---- set start condition ----
var fontSize = localStorage.getItem("fontsize");
if (fontSize == null) fontSize = 25
fontSizeInput.value = fontSize
localStorage.setItem("fontsize", fontSize);

//---- action handler ---
// Update the current slider value (each time you drag the slider handle)
fontSizeInput.oninput = function () {
    fontSize = this.value
    localStorage.setItem("fontsize", fontSize);
    changefontSize()
}

darkModeButton.onclick = function () {
    toggleDarkMode()
};

//################################### metronom ###################################
const tabButton = document.getElementById("tap")
const metronomStatusButton = document.getElementById("metronomstart")
const bpmSlider = document.getElementById("bpmSlider")
const lengthInput = document.getElementById("length")
const advancedEnabledCB = document.getElementById("advanced")
const playForInput = document.getElementById("playFor")
const pauseForInput = document.getElementById("pauseFor")
const bpmdisplay = document.getElementById("bpmdisplay")
const metronom = new Metronom(bpm, length)

//---- set start condition ----
var bpm = localStorage.getItem("bpm");
if (bpm == null) bpm = 150
bpmSlider.value = bpm
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

//---- action handler ---
bpmSlider.oninput = function () {
    bpm = this.value
    localStorage.setItem("bpm", bpm);
    document.getElementById("bpmdisplay").innerText = bpm
    metronom.updateMetronomspeed(bpm)
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
        metronomStatusButton.value = "stop"
    } else {
        metronomStatusButton.value = "start"
    }
}

var lastTap = 0
tabButton.onclick = function toggleMetronom() {
    var d = new Date();
    var temp = parseInt(d.getTime(), 10);

    var bpmFromTap = Math.ceil(60000 / (temp - lastTap))
    lastTap = temp;

    if (bpmFromTap > 20){
        bpm = bpmFromTap
        localStorage.setItem("bpm", bpmFromTap);
        document.getElementById("bpmdisplay").innerText = bpmFromTap
        metronom.updateMetronomspeed(bpmFromTap)
        bpmSlider.value = bpmFromTap
    }
}

//initial creation
createNewContent()