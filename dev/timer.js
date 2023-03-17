//from: https://github.com/musicandcode/Metronome/blob/main/timer.js
// Add accurate timer constructor function

function Timer(timeInterval) {
    this.timeInterval = timeInterval;

    this.start = () => {
        this.expected = Date.now() + this.timeInterval;
        this.theTimeout = null;

        metronom.playSound();

        this.timeout = setTimeout(this.round, this.timeInterval);
        console.log('Timer Started');
    }

    this.stop = () => {
        clearTimeout(this.timeout);
        console.log('Timer Stopped');
    }

    this.round = () => {
        var drift = Date.now() - this.expected;

        metronom.playSound();

        this.expected += this.timeInterval;
        this.timeout = setTimeout(this.round, this.timeInterval - drift);
    }
}