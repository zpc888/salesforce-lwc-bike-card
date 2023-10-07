import { LightningElement } from 'lwc';

export default class StopWatch extends LightningElement {
    timer = '0';
    timerRef;
    timerName = 'gzTimer';

    phase = 'stopped';             // stopped -> running --> paused

    get isStopped() {
        return this.phase === 'stopped';
    }

    get isRunning() {
        return this.phase === 'running';
    }

    get isPaused() {
        return this.phase === 'paused';
    }

    actionHandler(event) {
        const { label } = event.target;
        switch (label) {
            case 'Start': 
                this.startTimer();
                this.phase = 'running';
                break;
            case 'Pause': 
                this.pauseTimer();
                this.phase = 'paused';
                break;
            case 'Resume': 
                this.resumeTimer();
                this.phase = 'running';
                break;
            case 'Stop': 
                window.localStorage.removeItem(this.timerName);
                window.localStorage.removeItem('msWhenPausing');
                if (this.timerRef) {
                    window.clearInterval(this.timerRef);
                    this.timerRef = null;
                }
                this.phase = 'stopped';
                break;
            default:        // Reset
                window.localStorage.removeItem(this.timerName);
                window.localStorage.removeItem('msWhenPausing');
                if (this.timerRef) {
                    window.clearInterval(this.timerRef);
                    this.timerRef = null;
                }
                this.timer = '0';
                this.phase = 'stopped';
                break;
        }
    }

    startTimerHandler() {
        const startTime = new Date();
        window.localStorage.setItem(this.timerName, startTime);
        return startTime;
    }

    pauseTimer() {
        if (this.timerRef) {
            window.clearInterval(this.timerRef);
            this.timerRef = null;
        }
        const startTime = new Date( window.localStorage.getItem(this.timerName) || this.startTimerHandler() );
        const secs = new Date().getTime() - startTime.getTime();
        window.localStorage.setItem('msWhenPausing', secs);
    }

    resumeTimer() {
        const msWhenPausing = Number(window.localStorage.getItem('msWhenPausing'));
        const newDate = new Date();
        newDate.setTime(newDate.getTime() - msWhenPausing);
        window.localStorage.setItem(this.timerName, newDate);
        window.localStorage.removeItem('msWhenPausing');
        this.startTimer();
    }

    startTimer() {
        const startTime = new Date( window.localStorage.getItem(this.timerName) || this.startTimerHandler() );
        if (!this.timerRef) {
            this.timerRef = window.setInterval(() => {
                const secs = new Date().getTime() - startTime.getTime();
                this.timer = this.secondsToHMS(Math.floor(secs/1000));
            }, 1000);
        }
    }

    secondsToHMS(d) {
        d = Number(d);
        const h = Math.floor( d / 3600 );
        const m = Math.floor( (d % 3600) / 60 );
        const s = Math.floor( (d % 3600) % 60 );
        const display = (n, zero, single, plural) => {
            if (n === 0) {
                return zero;
            } else if (n === 1) {
                return n + single;
            } else {
                return n + plural;
            }
        };
        const hDisplay = display(h, "", " hour, ", " hours, ");
        const mDisplay = display(m, "0 minutes ", " minute, ", " minutes, ");
        const sDisplay = display(s, "", " second", " seconds");
        return hDisplay + mDisplay + sDisplay;
    }

    connectedCallback() {
        if (window.localStorage.getItem(this.timerName)) {
            this.startTimer();
        }
    }
}
