const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function Metronom() {
    this.volume = audioCtx.createGain();
    this.volume.connect(audioCtx.destination);

    //settings
    this.timer = new Timer(60000 / 150);
    this.length = 4
    this.active = false
    this.countPlayed = 0;
    this.volume.gain.value = 1;

    //regulary pauses
    this.fixedPauseEnabled = false
    this.playForAmount = 4
    this.pauseForAmount = 1

    //random pauses
    this.rendomPauses = false
    this.rendomPausesMaxLength = 2
    this.randomOldTackt = 0
    this.rondomPauseFor = 0
    this.randomstate = 0

    this.taktcounter = 0
    this.makeNoice = true

    this.playSound = () => {
        this.countPlayed++
        if (this.countPlayed == this.length) {
            this.countPlayed = 0
            this.taktcounter++
        }

        if (this.fixedPauseEnabled) {
            this.playWithFixedPause(this.countPlayed == 1)
        } else if (this.rendomPauses) {
            this.playWithRandomPause(this.countPlayed == 1)
        } else {
            this.play(this.countPlayed == 1)
        }
    }

    this.playWithFixedPause = (highOrLow) => {
        if (this.makeNoice) {
            this.play(highOrLow)

            if (this.taktcounter >= this.playForAmount && this.pauseForAmount > 0) {
                this.taktcounter = 0;
                this.makeNoice = !this.makeNoice
            }
        } else {
            if (this.taktcounter >= this.pauseForAmount && this.playForAmount > 0) {
                this.taktcounter = 0;
                this.makeNoice = !this.makeNoice
            }
        }
    }

    this.playWithRandomPause = (highOrLow) => {
        if (this.randomstate == 0) {
            //play through the begin of the next
            this.play(highOrLow)
            if (this.countPlayed == (this.length - 1)) {
                this.randomstate++;
                this.randomOldTackt = this.taktcounter + 2;
            }
        } else if (this.randomstate == 1) {
            //play through the begin of the next
            this.play(highOrLow)
            if (this.randomOldTackt == this.taktcounter) {
                this.randomstate ++ ;
            }
        }else if (this.randomstate == 2) {
            //generate raondom play
            var rand = Math.random()
            this.play(highOrLow)
            this.rondomPauseFor = Math.floor(rand * (this.rendomPausesMaxLength + 1));
            this.randomstate++;
            this.playWithRandomPause(highOrLow)
        } else if (this.randomstate == 3) {
            //pause
            if (--this.rondomPauseFor <= 0) {
                this.randomstate++;
            }
        } else if (this.randomstate == 4) {
            //generate raondom
            var rand = Math.random()
            this.rondomPauseFor = Math.floor(rand * (this.rendomPausesMaxLength + 1));
            this.randomstate++;
            this.playWithRandomPause(highOrLow)
        } else if (this.randomstate == 5) {
            //pause
            if (--this.rondomPauseFor <= 0) {
                this.randomstate=0;
            }
        } 

    }

    this.play = (highOrLow) => {
        let oscillator = this.generateoscillator()
        if (highOrLow) {
            oscillator.frequency.value = 430;
        } else {
            oscillator.frequency.value = 330;
        }
        let currentTime = audioCtx.currentTime;
        oscillator.start(currentTime);
        oscillator.stop(currentTime + 0.05);
    }

    this.generateoscillator = () => {
        let oscillator = audioCtx.createOscillator();
        oscillator.connect(this.volume);
        return oscillator
    }


    this.updateMetronomspeed = (bpm) => {
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
        this.makeNoice = true
    }

    this.pauseFor = (amount) => {
        this.pauseForAmount = amount
        this.makeNoice = true
    }

    this.enableAdvanced = (enable) => {

        this.fixedPauseEnabled = enable
    }

    this.setVolume = (volume) => {
        this.volume.gain.value = volume;
    }

    this.updateRandomMaxLength = (volume) => {
        this.rendomPausesMaxLength = volume;
    }

    this.activateRandomPause = (volume) => {
        this.rendomPauses = volume;
    }
}



