import { LightningElement } from 'lwc';

export default class AnalogStopWatch extends LightningElement {
    elapsedTime = '00:00:00';
    startedTime;

    connectedCallback() {
        this.startedTime = (new Date()).getTime();
        this.updateClock();
        window.setInterval(() => {
            this.reCalcElapsedTime();
            this.updateClock();
        }, 1000);
    }

    renderedCallback() {
        this.updateClock();
    }

    get hours() {
        // Generate hour numbers and their positions
        const hourNumbers = [];
        for (let i = 1; i <= 12; i++) {
            const angle = (i * 360 / 12) - 90;
            const cx = 50 + 36 * Math.cos(angle * Math.PI / 180);
            const cy = 50 + 36 * Math.sin(angle * Math.PI / 180);
            hourNumbers.push({ value: i, cx, cy });
        }
        return hourNumbers;
    }

    get dots() {
        // Generate dots for the minutes and their positions
        const minuteDots = [];
        for (let i = 0; i < 60; i++) {
            if (i % 5 !== 0) {
                const angle = (i * 360 / 60) - 90;
                const cx = 50 + 41.5 * Math.cos(angle * Math.PI / 180);
                const cy = 50 + 41.5 * Math.sin(angle * Math.PI / 180);
                minuteDots.push({ value: i, cx, cy });
            }
        }
        return minuteDots;
    }

    updateClock() {
        const now = new Date();

        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Calculate angles for the clock hands
        const hourAngle = (hours % 12 + minutes / 60) * 360 / 12;
        const minuteAngle = (minutes + seconds / 60) * 360 / 60;
        const secondAngle = seconds * 360 / 60;

        // Apply the rotation to the clock hands
        this.setHandRotation('hour-hand', hourAngle);
        this.setHandRotation('minute-hand', minuteAngle);
        this.setHandRotation('second-hand', secondAngle);
    }

    setHandRotation(handClass, angle) {
        const handElement = this.template.querySelector('.' + handClass);
        if (handElement) {
            handElement.style.transform = `rotate(${angle}deg)`;
        }
    }

    reCalcElapsedTime() {
        const d = Math.floor(((new Date()).getTime() - this.startedTime) / 1000);
        const h = Math.floor( d / 3600 );
        const m = Math.floor( (d % 3600) / 60 );
        const s = Math.floor( (d % 3600) % 60 );
        const display = (n) => {
            if (n < 10) {
                return '0' + n;
            } else {
                return n;
            }
        };
        this.elapsedTime = display(h) + ':' + display(m) + ':' + display(s);
    }
}