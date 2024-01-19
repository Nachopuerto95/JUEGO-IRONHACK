class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.height = CANVAS_H ;
        this.canvas.width = CANVAS_W ;
        this.ctx = this.canvas.getContext('2d');

        this.fps = FPS;
        this.drawIntervalId = undefined;

        this.player = new Player(this.ctx, PLAYER_X, PLAYER_Y);
        this.background = new Background(this.ctx, this.player);
    }

    onKeyEvent(event) {
        this.player.onKeyEvent(event);
        this.background.onKeyEvent(event);
    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw(); 
            }, this.fps);
        }
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    move() {
        this.player.move();
        this.background.move();
        
    }

    draw() {
        this.background.draw();
        this.player.draw();
    }

    clear() {
        this.player.clear();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // volvemos a pintar de blanco
    }
}