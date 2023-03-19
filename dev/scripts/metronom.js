const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function Metronom(startbpm, ) {
    this.timer = new Timer(60000 / startbpm);
    this.countPlayed = 0;
    this.length = length
    this.playForAmount = 4
    this.pauseForAmount = 1
    this.taktcounter = 0
    this.isplayingMode = true
    this.advancedEnable = false
    this.active = false
    this.volume = audioCtx.createGain();
    this.volume.connect(audioCtx.destination);
    this.volume.gain.value = 1;



    this.playSound = () => {
        this.play(this.countPlayed == 0)
        
        this.countPlayed++
        if (this.countPlayed == this.length) {
            this.countPlayed = 0
            this.taktcounter++
        }
    }

    this.play = (highOrLow) => {
        let oscillator = this.generateoscillator()

        let currentTime = audioCtx.currentTime;
        if (this.isplayingMode || this.advancedEnable) {
            if (highOrLow) {
                oscillator.frequency.value = 430; 
            } else {
                oscillator.frequency.value = 330; 
            }
            oscillator.start(currentTime);
            oscillator.stop(currentTime + 0.05);

            if (this.taktcounter == this.playForAmount && this.pauseForAmount > 0) {
                this.taktcounter = 0;
                this.isplayingMode = !this.isplayingMode
            }
        } else {
            if (this.taktcounter == this.pauseForAmount && this.playForAmount > 0) {
                this.taktcounter = 0;
                this.isplayingMode = !this.isplayingMode
            }
        }
    }

    this.generateoscillator = () => {
        let oscillator = audioCtx.createOscillator();
        oscillator.connect(this.volume);
        return oscillator
    }


    this.updateMetronomspeed = (bpm) => {
        console.log("set bpm", bpm)
        this.timer.timeInterval = 60000 / bpm;
    }

    this.contolState = () => {
        this.active = !this.active
        if (this.active) {
            this.countPlayed = 0
            this.timer.start()
        } else {
            this.timer.stop()
        }
        return this.active
    }

    this.updateLength = (length) => {
        this.length = length
        this.countPlayed = 0
    }

    this.playFor = (amount) => {
        this.playForAmount = amount
        this.isplayingMode = true
    }

    this.pauseFor = (amount) => {
        this.pauseForAmount = amount
        this.isplayingMode = true
    }

    this.enableAdvanced = (enable) => {
        this.advancedEnable = !enable
    }

    this.setVolume = (volume) => {
        this.volume.gain.value = volume;
    }
}



