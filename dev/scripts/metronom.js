const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

class Metronom {
    constructor(startbpm, length) {
        this.timer = new Timer(60000 / startbpm);
        console.log(this.timer)
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
    }

    playSound() {
        

        this.play(this.countPlayed == 0)
        
        this.countPlayed++
        if (this.countPlayed == this.length) {
            this.countPlayed = 0
            this.taktcounter++
        }
    }

    play(highOrLow) {
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

    generateoscillator(){
        let oscillator = audioCtx.createOscillator();
        oscillator.connect(this.volume);
        return oscillator
    }


    updateMetronomspeed(bpm) {
        console.log("set bpm", bpm)
        this.timer.timeInterval = 60000 / bpm;
    }

    contolState() {
        this.active = !this.active
        if (this.active) {
            this.countPlayed = 0
            this.timer.start()
        } else {
            this.timer.stop()
        }
        return this.active
    }

    updateLength(length) {
        this.length = length
        this.countPlayed = 0
    }

    playFor(amount) {
        this.playForAmount = amount
        this.isplayingMode = true
    }

    pauseFor(amount) {
        this.pauseForAmount = amount
        this.isplayingMode = true
    }

    enableAdvanced(enable){
        this.advancedEnable = !enable
    }

    setVolume(volume){
        this.volume.gain.value = volume;
    }
}



