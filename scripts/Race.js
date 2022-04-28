class Race {
    constructor(distance, duration) {
        this.distance = distance;
        this.duration = duration;
        this.velocity = this.distance / this.duration;
        this.vo2Max();
    }

    calcuateVoMax() {
        let percentMax = 0.8 + 0.1894393 * Math.exp(-0.012778 * this.duration) + 0.2989558 * Math.exp(-0.1932605 * this.timeMinutes);
        let vo2 = -4.60 + 0.182258 * this.velocity + 0.000104 * this.velocity * this.velocity;
        this.vo2Max(vo2 / percentMax);
    }
}