// https://www.youtube.com/watch?v=VW8qoyYzWGg

class Flake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = 0;
        this.alpha = 0;

        this.reset();
    }

    reset() {
        this.x = this.randBetween(0, window.innerWidth);
        this.y = this.randBetween(0, -window.innerHeight);
        this.vx = this.randBetween(-3, 3);
        this.vy = this.randBetween(2, 5);
        this.radius = this.randBetween(1, 4);
        this.alpha = this.randBetween(0.1, 0.9);
    }

    randBetween(min, max) {
        return min + Math.random() * (max - min);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.y + this.radius > window.innerHeight) {
            this.reset();
        }
    }
}

class Snow {
    constructor() {
        this.container = document.getElementById('snow');
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        window.addEventListener('resize', () => this.onResize());
        this.onResize();

        requestAnimationFrame(() => this.update());
        this.createFlakes();
    }

    onResize() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
    }

    createFlakes() {
        this.snowflakes = [];

        for (let s = 0; s < this.container.clientWidth / 2; s++) {
            this.snowflakes.push(new Flake());
        }
    }

    update() {
        this.ctx.clearRect(0, 0, this.container.clientWidth, this.container.clientHeight);
        for (const flake of this.snowflakes) {
            flake.update();
            this.ctx.save();
            this.ctx.fillStyle = '#fff';
            this.ctx.beginPath();
            this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.globalAlpha = flake.alpha;
            this.ctx.fill();
            this.ctx.restore();
        }

        requestAnimationFrame(() => this.update());
    }
}

new Snow();