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
        this.audioManager = new AudioManager()
        this.timeBar = []
        this.isDead = false

        this.fruits = [];
        this.addFruitTick = 0;
        

        this.timer = GAME_TIME;

        this.floor = this.player.y + this.player.h;

        this.enemies = []
        this.rocks = []
        this.addSnailTick = 0;
        this.addBirdTick = 0;
        this.addSpiderTick = 0;
        this.addRockTick = 0;
        


        this.gamePaused = false
        this.points = 0;
        this.canvas = document.getElementById('main-canvas')
        this.gameOverPanel = document.getElementById('game-over-panel')
        this.gameIsOver = false;
        this.yourScore = document.getElementById('your-score')


        this.deathAnimations = [];
        this.drawPoints = [];

        this.currentSpeed = ORIGINAL_SPEED

        this.audioManager = new AudioManager()
        this.musicPlaying = false

        this.bntEnable = true;
    }

    

   createTimeBar() {
        for (let i = 0; i < this.timer; i++) {
            this.timeBar.push(new Timeunit(this.ctx, 380 + 30 * i,100));
          }
    }

    gameOver() {

        
        if (this.timer <= 0 || this.player.lifes <= 0 ) {

            this.player.isDead = true;
            this.player.jump()
            this.player.y0 = 1000;
            this.gameIsOver = true
            this.canvas.classList.add('desaturate-50')
            this.yourScore.textContent = `SCORE: ${this.points}`;
            this.bntEnable = false;
            


            setTimeout(() => {
                this.stop()
                this.gameOverPanel.classList.remove('hidden')
                this.bntEnable = true;

            }, 1500)
        }

        
    }

    calculateTime(){
        setInterval(() => {
            this.timer--
            this.timeBar.pop();
        }, 2000)

        
    }

    addRandomEnemy() {
        this.addSnailTick++;
        this.addBirdTick++;
        this.addSpiderTick++;
        this.addRockTick++;

        if (this.addSnailTick + Math.random() * 350 > SNAIL_SPAWN_TICK) {
            this.addSnailTick = 0;
            this.enemies.push(new Snail(this.ctx, this.background.w, FLOOR - 100))
        }

        if (this.addRockTick + Math.random() * 150 > SNAIL_SPAWN_TICK) {
            this.addRockTick = 0;
            this.rocks.push(new Rock(this.ctx, this.background.w, FLOOR - 65))
        }


        if (this.addSpiderTick + Math.random() * 150 > SPIDER_SPAWN_TICK) {
            this.addSpiderTick = 0;
        }
       
        if (this.addSpiderTick + Math.random() * 150 > SPIDER_SPAWN_TICK) {
            this.addSpiderTick = 0;
            this.enemies.push(new Bird(this.ctx, this.background.w, Math.floor(Math.random() * 200) + 150))
        }

        if (this.addBirdTick + Math.random() * 250 > BIRD_SPAWN_TICK) {
            this.addBirdTick = 0;
            this.enemies.push(new Spider(this.ctx, this.background.w, BIRD_Y))
        }

    }

    addRandomFruit() {
        this.addFruitTick++;
        if (this.addFruitTick + Math.random() * 350 > FRUIT_SPAWN_TICK) {
            this.addFruitTick = 0;
            this.fruits.push(new Fruit(this.ctx, 1080,Math.floor(Math.random() * 250) + 150, Math.floor(Math.random() * 3)))
        }
    }

    takeAFruit() {
        this.audioManager.fruitFX.play();

        if (this.timeBar.length < 10) {
            for (let i = 0 ; i <  FRUIT_SCORE; i++) {
                const j = this.timeBar.length;
                this.timeBar.push(new Timeunit(this.ctx, 380 + 30 * j,100));
            }
            this.timer += FRUIT_SCORE; 
        }
        this.drawPoints.push(new Drawpoints(this.ctx, this.player.x + 100, 400, FRUIT_POINTS))
        
    }

    onKeyEvent(event) {
        this.player.onKeyEvent(event);
        this.background.onKeyEvent(event);

        const enabled = event.type === 'keyup'; 
        switch (event.keyCode) {
            case KEY_ENTER:

                if (!enabled) {
                    return;
                } else if (enabled && this.player.isInMiddle && this.player.lifes > 0 && !this.gameIsOver) {
                   
                    if (this.gamePaused) { 
                        this.canvas.classList.remove('desaturate-50')
                        this.start()
                        } else { 
                        this.canvas.classList.add('desaturate-50')
                        this.stop(); 
                        }
                    this.gamePaused = !this.gamePaused
                
                    break;
                }
                

                
        }
    }


    
    start() {
        this.canvas.classList.remove('desaturate-50')
        this.calculateTime()
        this.createTimeBar()
        
        

        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {

                this.clear();
                this.draw(); 
                
                if (this.player.isInMiddle) { 
                    this.addRandomEnemy();
                    this.addRandomFruit();
                    this.gameOver()
                
                    
                }
                this.checkCollisions();
                this.move();
                
            }, this.fps);
            
        }
        
    }

    checkCollisions() {

        this.rocks.forEach((rock) => {
            if (rock.collidesWith(this.player)) {
                this.audioManager.rockFX.play();
                this.player.fall()
                this.timeBar.pop()
                this.timeBar.pop()
                this.timeBar.pop()
                this.timer -= 3;
            }
        })

        this.enemies.forEach((enemy) => {
            if (enemy.collidesWith(this.player)) {
                this.player.lifes--;
            }
        })

        this.fruits.forEach((fruit) => {
            
            if (fruit.collidesWith(this.player)) {
                fruit.lifes--
                this.points += FRUIT_POINTS;
                this.takeAFruit()
                this.deathAnimations.push(new DeathAnimation(this.ctx, fruit.x , fruit.y + 20));
                ;
            }})
 
        this.player.bullets = this.player.bullets.filter((bullet) => {
            const enemyCollision = this.enemies.find(enemy => enemy.collidesWith(bullet));
            const rockCollision = this.rocks.find(rock => rock.collidesWith(bullet)); // FIND SIRVE PARA ENCONTRAR EN QUE ELEMENTO DEL ARRAY SE CUMPLE LO QUE LE HEMOS PASADO
            if (enemyCollision) {
                enemyCollision.lifes--;
                if (enemyCollision.lifes <= 0) {
                    this.audioManager.startFX.play()
                    this.points += enemyCollision.points;
                    this.deathAnimations.push(new DeathAnimation(this.ctx, enemyCollision.x , enemyCollision.y + 20));
                    this.drawPoints.push(new Drawpoints(this.ctx, this.player.x + 100, 400, enemyCollision.points))
                    this.isDead = true;
                }
                return false
            }  else if (rockCollision) {
                rockCollision.lifes--;
                if (rockCollision.lifes <= 0) {
                    this.points += rockCollision.points;
                    this.deathAnimations.push(new DeathAnimation(this.ctx, rockCollision.x , rockCollision.y + 20));
                    this.drawPoints.push(new Drawpoints(this.ctx, this.player.x + 100, 400, rockCollision.points))
                    this.isDead = true;
                }
                return false
            } else {
                return true
            }
        })
    }

    

    saveScoreName(name) {
        const scores = localStorage.getItem(SCORE_KEY) ? JSON.parse(localStorage.getItem(SCORE_KEY)) : {}
        scores[name] = this.points;
        localStorage.setItem(SCORE_KEY, JSON.stringify(scores));

        
    }

    

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    move() {

        
            this.currentSpeed = this.player.speed(this.currentSpeed);
            this.player.move();
            this.deathAnimations.forEach((animation) => animation.move(this.currentSpeed) );
            this.drawPoints.forEach((draw) => draw.move());
            


            if (this.player.isInMiddle && !this.gameIsOver) {
                this.background.move(this.currentSpeed);
                this.fruits.forEach((fruit) => fruit.move(this.currentSpeed));
                this.enemies.forEach((enemy) => enemy.move(this.currentSpeed));
                this.rocks.forEach((rock) => rock.move(this.currentSpeed));
            


            }
        
    }

    

    draw() {

        this.background.draw();
        this.player.draw();
        this.timeBar.forEach((bar) => bar.draw());
        this.fruits.forEach((fruit) => fruit.draw());
        this.enemies.forEach((enemy) => enemy.draw())
        this.rocks.forEach((rock) => rock.draw())

        this.deathAnimations.forEach((animation) => animation.draw())
        this.drawPoints.forEach((draw) => draw.draw());
        

        this.ctx.save();
        this.ctx.fillStyle = 'white'
        this.ctx.font = '40px Pixelify Sans'
        this.ctx.fillText(`Points: ${this.points}`, 30, 50)
        this.ctx.restore(); //IMPORTANTE GUARDAR Y RESTAURAR EL CONTEXTO PARA QUE LOS CAMBIOS NO SE APLIQUEN CADA VEZ QUE PINTAMOS
    }

    clear() {
        this.player.clear();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // volvemos a pintar de blanco
        this.enemies = this.enemies.filter((enemy) => enemy.isInCanvas && enemy.lifes > 0)
        this.rocks = this.rocks.filter((rock) => rock.isInCanvas && rock.lifes > 0)
        this.fruits = this.fruits.filter((fruit) => fruit.lifes > 0)
        this.drawPoints = this.drawPoints.filter((draw) => draw.y > 200)

    }
}