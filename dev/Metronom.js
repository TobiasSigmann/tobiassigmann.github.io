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

        this.click2 = new Audio('./sounds/klack.mp3');
        this.click1 = new Audio('./sounds/klick.mp3');
    }

    playSound() {
        this.countPlayed++
        if (this.countPlayed == this.length) {
            this.countPlayed = 0
            this.taktcounter++
            this.play(true)
        } else {
            this.play(false)
        }
    }

    play(highOrLow) {
        if (this.isplayingMode) {
            if (highOrLow) {
                this.click1.play();
            } else {
                this.click2.play();
            }
            console.log(this.taktcounter)
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


    updateMetronomspeed(bpm) {
        console.log("set bpm", bpm)
        this.timer.timeInterval = 60000 / bpm;
    }

    contolState(active) {
        console.log("set metronom", active)
        if (active) {
            this.countPlayed = 0
            this.timer.start()
        } else {
            this.timer.stop()
        }
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
}






