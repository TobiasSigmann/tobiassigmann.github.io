
function Generator() {
    //Notes for creating the scarmbling array
    const notes = ["A", "G", "D"]

    //duplicates
    const defaultNotes = ["C", "B", "E", "F"]
    const special = ["B#", "Cb", "Fb", "E#"]

    //fid ges
    const fis = ["A#", "G#", "F#", "D#", "C#"]
    const ges = ["Bb", "Ab", "Gb", "Eb", "Db"]

    //output
    //contining the scrammbeled nodes
    this.scrambeldNodes = []

    //input
    this.amount = 1
    this.mode = 0
    this.hardcoreMode = false

    //create the scrammbeled nodes using the user input
    this.createNoteArray = () => {
        var combined = [];
        var baseNotes = []

        //step1
        if (this.hardcoreMode) {
            var normalandSpecial = [];
            var position = Array.from({ length: 4 }, () => Math.floor(Math.random() * 2));

            //combine fid and ges to one array
            position.forEach((arraySelector, index) => {
                if (arraySelector == 1) {
                    normalandSpecial.push(defaultNotes[index]);
                } else {
                    normalandSpecial.push(special[index]);
                }
            })
            baseNotes = notes.concat(normalandSpecial)
        } else {
            baseNotes = notes.concat(defaultNotes)
        }

        //step2
        if (this.mode == 2) {
            var combinedFisAndGes = [];
            var position = Array.from({ length: 5 }, () => Math.floor(Math.random() * 2));

            //combine fid and ges to one array
            position.forEach((arraySelector, index) => {
                if (arraySelector == 1) {
                    combinedFisAndGes.push(fis[index]);
                } else {
                    combinedFisAndGes.push(ges[index]);
                }
            })
            combined = baseNotes.concat(combinedFisAndGes);
        } else if (this.mode == 0) {
            combined = baseNotes.concat(fis);
        } else if (this.mode == 1) {
            combined = baseNotes.concat(ges);
        }

        return combined
    }

    /*
     * generate ans scramble the node array
     */
    this.createRandomNodeArray = () => {
        var combined = this.createNoteArray()
        this.scrambeldNodes = []
        for (var i = 0; i < this.amount; i++) {
            //recreate fis ges part of the node array
            combined = this.createNoteArray()

            var c = 0
            //scramble
            this.scrambeldNodes.push([...combined].sort((a, b) => {
                c += 1
                return 0.5 - Math.random()

            }))
        }
    }

    /*
        * split array into equal parts
        */
    this.sliceIntoChunks = (arr, chunkSize) => {
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
    this.createHTMLString = () => {
        const preText = "<p class=\"line\"><span>|</span><span>"
        const postText = "</span><span>|</span></p><br><br>"

        var textToShow = ""
        this.scrambeldNodes.forEach((exercice, idx) => {
            //for each line
            htmlExcercice = ""
            this.sliceIntoChunks(exercice, 4).forEach(parts => {
                htmlExcercice += preText + parts.join("</span><span>|</span><span>") + postText
            })

            textToShow += "<div id=\"outputElement\"><h3>Exercise " + (idx + 1) + ":</h3><br>" + htmlExcercice + "</div><br>"
        })
        output.innerHTML = textToShow
    }

    /*
        * create text for textfile
        */
    this.createTextForFile = () => {
        const header = "####################\n#\tExercice\n####################\n\n\n"
        const preText = "|    "
        const postText = "    |\n"
        var data = header

        //make all nodes the same width (2 caracters)
        var prepared = scrambeldNodes.map(execrises => {
            return execrises.map(e => {
                if (e.length == 1) {
                    return e + " ";
                }
                return e;
            })
        })

        prepared.forEach((exercice, idx) => {
            //for each row
            excerciceText = ""
            sliceIntoChunks(exercice, 4).forEach(parts => {
                excerciceText += preText + parts.join("    |    ") + postText
            })


            data += "Exercise " + (idx + 1) + ":\n" + excerciceText + "\n\n"
        })

        return data
    }

    /*
        * create nodes and display on page
        */
    this.createNewContent = () => {
        this.createRandomNodeArray()
        this.createHTMLString()
        changefontSize()
    }


    /*
    *   setter
    */
    this.setAmount = (amount) => {
        this.amount = amount
    }

    this.setMode = (mode) => {
        this.mode = mode
    }

    this.setHardcore = (hardcoreMode) => {
        this.hardcoreMode = hardcoreMode
    }
}