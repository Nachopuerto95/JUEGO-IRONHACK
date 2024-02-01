class Player {
    constructor(ctx, x, y) {

        this.ctx = ctx;

        this.x = x;
        this.vx = SPEED_MOVE;
        this.y = y;
        this.y0 = this.y;
        this.vy = 0;
        this.w = PLAYER_WIDTH;
        this.h = PLAYER_HEIGHT;
        this.playerTour = 0;

        this.isInMiddle = false;
        this.isDead = false;

        this.sprite = new Image();
        this.sprite.src = 'assets/img/playerSprite.png';
        this.sprite.verticalFrames = 7;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 2;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = this.sprite.width / this.sprite.horizontalFrames -1;
            this.sprite.frameHeight = this.sprite.height / this.sprite.verticalFrames;
        }
    

        this.movements = {
            right: false,
            slow: false,
            isJumping: false,
            isShoting: false,
            isfalling: false
        }

        this.animationTick = 0;

        this.bullets = [];
        this.lifes = 1;
        this.tickTour = 0;

        this.audioManager = new AudioManager(this.playerTour)
        
    }

    speed(currentSpeed) {
       
        if (this.movements.slow) {
            
            currentSpeed = SLOWED_GAME + this.playerTour;
        } else if(this.movements.right) {
            
            currentSpeed = ACELERATED_GAME + this.playerTour;
        } else {
            
            currentSpeed = ORIGINAL_SPEED + this.playerTour;
        }

       return currentSpeed;
    }
    

    onKeyEvent(event) {

        const enabled = event.type === 'keydown'; 
        switch (event.keyCode) {
            case KEY_RIGHT:
                event.preventDefault();
                this.movements.right = enabled;
                break;
            case KEY_LEFT:
                event.preventDefault();
                    this.movements.slow = enabled;
                    break;
            case KEY_UP:
                if (enabled) {
                this.jump();
                
                }
                break;
            case KEY_FIRE:
                if (enabled) {
                this.fire();
                }
                break;
            default:
                
        } 
    }
    move() {
         console.log(this.playerTour)
        if (this.x > this.ctx.canvas.width / 4 - this.w ) {
            this.x = this.x;
            this.isInMiddle = true;
            if (this.tickTour > SPEED_INCREASE) {
                this.playerTour += 0.1;
                this.tickTour = 0;
            }
            this.tickTour++;
            
        }else if (this.movements.right && !this.movements.left) {
            this.x += INITIAL_SPEED;
        } 

        if(this.y < this.y0) {
            this.movements.isJumping = true;
            this.movements.isfalling = true;
            this.vy += GRAVITY;
            this.y += this.vy
        } else {
            this.y = this.y0
            this.movements.isJumping = false;
            this.movements.isfalling = false;
        }

        this.bullets.forEach((bullet) => bullet.move())
    }


    fire() {
    
        if (!this.movements.isShoting && this.bullets.length < 2 ) {
            this.audioManager.shotFX.currentTime = 0; 
            this.audioManager.shotFX.play();
            this.movements.isShoting = true;
            this.bullets.push(new Bullet(this.ctx, this.x + this.w / 2 , this.y + Math.ceil(this.h / 2)));
            setTimeout(() => this.movements.isShoting = false, FIRE_COLDOWN);
        }
    }

    clear() {
        this.bullets = this.bullets.filter((bullet) => bullet.y < this.y0 + BULLET_END);
    }

    jump() {
        if (!this.movements.isJumping) {
            this.movements.isJumping = true;
            this.y -= Math.ceil(this.h / 2);
            this.vy = -SPEED_JUMP;

            if(!this.isDead) {
            this.audioManager.jumpFX.currentTime = 0; 
            this.audioManager.jumpFX.play();
            }
            
        }
    }

    fall() {

        if (!this.movements.isfalling) {
            this.movements.isfalling = true;
            this.y -= Math.ceil(this.h / 2);
            this.vy = -SPEED_FALL;
            this.x += this.vx
        }
        
            
        
    }
    

    animate() {
        this.animationTick++

        if (this.isDead) {
            this.sprite.verticalFrameIndex = 6;
            this.sprite.horizontalFrameIndex = 0;
        } 
        

        if (this.movements.isJumping && !this.isInMiddle && !this.isDead) {
            this.sprite.verticalFrameIndex = 2;
            this.sprite.horizontalFrameIndex = 0;
        } else if (this.movements.isJumping && this.isInMiddle && !this.isDead) {
            this.sprite.verticalFrameIndex = 5;
            this.sprite.horizontalFrameIndex = 0;
        }
        
        
        if (this.animationTick >= PLAYER_ANIMATION && !this.movements.isJumping && !this.movements.right && !this.isInMiddle && !this.isDead){
            this.animationTick = 0;
            this.sprite.horizontalFrameIndex++;
            this.sprite.verticalFrameIndex = 0;
           
            if(this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0;
                
            }
        }

        if(this.animationTick >= PLAYER_ANIMATION && this.movements.right && !this.isInMiddle && !this.isDead) {
            this.animationTick = 0;
            this.sprite.verticalFrameIndex = 1;
            this.sprite.horizontalFrameIndex++;

            if(this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0;
            }
        }
        
        if(this.animationTick >= PLAYER_ANIMATION && !this.movements.slow && !this.isDead) {
            this.animationTick = 0;
            this.sprite.verticalFrameIndex = 3
            ;
            this.sprite.horizontalFrameIndex++;

            if(this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0;
            }
        }

        if(this.animationTick >= PLAYER_ANIMATION && this.movements.slow && !this.isDead) {
            this.animationTick = 0;
            this.sprite.verticalFrameIndex = 4;
            this.sprite.horizontalFrameIndex++;

            if(this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0;
            }
        }
    }
    draw() {
        if (this.sprite.isReady) {
    
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.w,
                this.h

            )

            this.animate(); 
        } 
        

        this.bullets.forEach((bullet) => bullet.draw());
    }
}
