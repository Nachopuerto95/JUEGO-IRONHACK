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
        this.fruit = new Fruit(this.ctx, 1080,200, this.player.movements.slow)
        

        this.timer = GAME_TIME;

        this.floor = this.player.y + this.player.h;

        this.enemies = []
        this.addEnemyTick = 0;
        
        this.gamePaused = false

    }

    calculateTime(){
        setInterval(() => {
            this.timer--
        }, 1000)

        
    }

    addRandomEnemy() {
        this.addEnemyTick++
        if (this.addEnemyTick + Math.random() * 350 > SNAIL_SPAWN_TICK) {
            this.addEnemyTick = 0;
            this.enemies.push(new Snail(this.ctx, this.background.w, FLOOR))
        }
    }

    onKeyEvent(event) {
        this.player.onKeyEvent(event);
        this.background.onKeyEvent(event);

        const enabled = event.type === 'keyup'; 
        switch (event.keyCode) {
            case KEY_ENTER:

                if (!enabled)
                return;

                this.gamePaused ? this.start() : this.stop();
                this.gamePaused = !this.gamePaused
                
                break;
        }
    }

    start() {
        this.calculateTime()
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {

                this.clear();
                if (this.timer <= 0 ) {
                    this.stop()
                }
                if (this.player.isInMiddle) { 
                    this.addRandomEnemy();
        
                    
                }
                this.checkCollisions();
                this.move();
                this.draw(); 
            }, this.fps);
        }
    }

    checkCollisions() {
        this.enemies.forEach((enemy) => {
            if (enemy.collidesWith(this.player)) {
                this.stop();
            }
        })
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    move() {
        this.player.slow();
        this.player.move();

        if (this.player.isInMiddle) {
            this.background.move();
            this.fruit.move();
            this.enemies.forEach((enemy) => enemy.move  ())


        }
    }

    

    draw() {
        console.log(this.enemies)


        this.background.draw();
        this.player.draw();
        this.fruit.draw();
        this.enemies.forEach((enemy) => enemy.draw())
    }

    clear() {
        this.player.clear();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // volvemos a pintar de blanco
        this.enemies = this.enemies.filter((enemy) => enemy.isInCanvas)
    }
}