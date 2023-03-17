
/*
    * changing to darkmode
    */
function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

//Notes for creating the scarmbling array
const notes = ["A","G","D"]

//duplicates
const defaultNotes = ["C", "B", "E", "F"]
const special = ["B#", "Cb", "Fb", "E#"]

//fid ges
const fis = ["A#","G#","F#","D#","C#"]
const ges = ["Bb","Ab","Gb","Eb","Db"]

//contining the scrammbeled nodes
var scrambeldNodes = []

//fontsize handling
var fontSize = localStorage.getItem("fontsize");
if(fontSize == null) fontSize = 25
localStorage.setItem("fontsize", fontSize);

//amount
var amount = localStorage.getItem("amount");
if(amount == null) amount = 1
document.getElementById('amount').value = amount
localStorage.setItem("amount", amount);

//create the scrammbeled nodes using the user input
function createNoteArray(){
    var withFis = document.getElementById('fis').checked
    var withGes = document.getElementById('ges').checked
    var withboth = document.getElementById('both').checked

    var hardcore = document.getElementById('hardcore').checked

    var combined  = [];
    var baseNotes = []

    if (hardcore) {
        var normalandSpecial = [];
        var position = Array.from({ length: 4 }, () => Math.floor(Math.random() * 2));

        //combine fid and ges to one array
        position.forEach((arraySelector, index) => {
            if (arraySelector == 1) {
                normalandSpecial.push(defaultNotes[index]);
            } else {
                normalandSpecial.push(special[index]);
            }
        }
        )
        baseNotes = notes.concat(normalandSpecial)
    } else {
        baseNotes = notes.concat(defaultNotes)
    }
    
    if(withboth){
        var combinedFisAndGes = [];
        var position = Array.from({length: 5}, () => Math.floor(Math.random() * 2));

        //combine fid and ges to one array
        position.forEach( (arraySelector, index) => 
            {
                if(arraySelector == 1){
                    combinedFisAndGes.push(fis[index]);
                }else{
                    combinedFisAndGes.push(ges[index]);
                }
            }
        )
        combined = baseNotes.concat(combinedFisAndGes);
    }else if(withFis){
        combined = baseNotes.concat(fis);
    }else if(withGes){
        combined = baseNotes.concat(ges);
    }
    
    return combined
}

/*
    * generate ans scramble the node array
    */
function createRandomNodeArray() {
    var amount = document.getElementById('amount').value
    if(amount < 1) amount = 1;
    if(amount > 500) amount = 500;
    document.getElementById('amount').value = amount
    localStorage.setItem("amount", amount);

    
    var combined = createNoteArray()

    scrambeldNodes = []
    for(var i = 0; i < amount; i++){
        //recreate fis ges part of the node array
        combined = createNoteArray()

        var c = 0
        //scramble
        scrambeldNodes.push([...combined].sort((a, b) => {
            console.log(a,b)
            c += 1
            return 0.5 - Math.random()

    }))
    console.log("-",c)
    }
}

/*
    * split array into equal parts
    */
function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }

    return res;
}

/*
    * create html elements resembling the nodes
    */
function createHTMLString(){
    const preText = "<p class=\"line\"><span>|</span><span>"
    const postText = "</span><span>|</span></p><br><br>"

    var textToShow = ""
    scrambeldNodes.forEach( (exercice, idx) => {
        //for each line
        htmlExcercice = ""
        sliceIntoChunks(exercice,4).forEach( parts => {
            htmlExcercice += preText + parts.join("</span><span>|</span><span>") + postText
        })
        
        textToShow += "<div id=\"outputElement\"><h3>Exercise " + (idx+1) + ":</h3><br>" + htmlExcercice + "</div><br>"	
    })

    document.getElementById('output').innerHTML = textToShow
}

/*
    * create text for textfile
    */
function createTextForFile(){
    const header = "####################\n#\tExercice\n####################\n\n\n"
    const preText = "|    "
    const postText = "    |\n"
    var data = header

    //make all nodes the same width (2 caracters)
    var prepared = scrambeldNodes.map(execrises => {
        return execrises.map(e => {
            console.log(e)
            if(e.length == 1){
                return e+" ";
            }
            return e;
        })
    })

    prepared.forEach( (exercice,idx) => {
        //for each row
        excerciceText = ""
        sliceIntoChunks(exercice,4).forEach( parts => {
            excerciceText += preText + parts.join("    |    ") + postText
        })
        

        data += "Exercise "+  (idx+1) + ":\n" + excerciceText + "\n\n"	
    })

    return data
}

/*
    * create nodes and display on page
    */
function createNewContent(){
    createRandomNodeArray()
    createHTMLString()
    changefontSize()
}

//initial creation
createNewContent()

document.getElementById('amount').addEventListener ("change", function () {
    createNewContent();
});
document.getElementById('fis').addEventListener ("change", function () {
    createNewContent();
});
document.getElementById('ges').addEventListener ("change", function () {
    createNewContent();
});
document.getElementById('both').addEventListener ("change", function () {
    createNewContent();
});

function changefontSize(){
    document.querySelectorAll('span').forEach(node => {
        node.style.fontSize =  fontSize + "pt"
    })
}

// Update the current slider value (each time you drag the slider handle)
document.getElementById("fontsizeChanger").oninput = function() {
    fontSize = this.value 
    changefontSize()
    localStorage.setItem("fontsize", fontSize);
}

document.getElementById("fontsizeChanger").value = fontSize





//Mentronom
var bpm = 120
var length = 4
const metronom = new Metronom(bpm, length)
document.getElementById("bpmdisplay").innerText = bpm
document.getElementById("speed").value = bpm
document.getElementById("length").value = length
document.getElementById("playFor").value = 4


document.getElementById("speed").oninput = function () {
    bpm = this.value
    document.getElementById("bpmdisplay").innerText = bpm
    metronom.updateMetronomspeed(bpm)
}

document.getElementById("speed").oninput = function () {
    bpm = this.value
    document.getElementById("bpmdisplay").innerText = bpm
    metronom.updateMetronomspeed(bpm)
}

document.getElementById("length").oninput = function () {
    length = this.value
    metronom.updateLength(length)
}

document.getElementById("playFor").oninput = function () {
    length = this.value
    metronom.playFor(length)
}

document.getElementById("pauseFor").oninput = function () {
    length = this.value
    metronom.pauseFor(length)
}

var metronomstate = false
function toggleMetronom() {
    metronomstate = !metronomstate
    metronom.contolState(metronomstate)
    if (metronomstate) {
        document.getElementById("metronomstart").value = "stop"
    } else {
        document.getElementById("metronomstart").value = "start"
    }
}