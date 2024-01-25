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
        }

        this.animationTick = 0;

        this.bullets = [];
    }

    onKeyEvent(event) {

        const enabled = event.type === 'keydown'; 
        switch (event.keyCode) {
            case KEY_RIGHT:
                this.movements.right = enabled;
                break;
            case KEY_LEFT:
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

    fire() {
    
        if (!this.movements.isShoting && this.bullets.length < 2 ) {
            this.movements.isShoting = true;
            this.bullets.push(new Bullet(this.ctx, this.x + this.w / 2 , this.y + Math.ceil(this.h / 2)));
            setTimeout(() => this.movements.isShoting = false, FIRE_COLDOWN);
        }
    }

    clear() {
        this.bullets = this.bullets.filter((bullet) => bullet.y < this.y0 + BULLET_END);
    }

    slow() {
        if (this.movements.slow) {
            BACKGROUND_SPEED = SLOWED_GAME;
        } else {
            BACKGROUND_SPEED = ORIGINAL_SPEED;
        }
    }

    


    jump() {
        if (!this.movements.isJumping) {
            this.movements.isJumping = true;
            this.y -= Math.ceil(this.h / 2);
            this.vy = -SPEED_JUMP;
        }
    }

    move() {
         
        if (this.x > this.ctx.canvas.width / 2 - this.w ) {
            this.x = this.x;
            this.isInMiddle = true;
            this.playerTour += 0.1;
        }else if (this.movements.right && !this.movements.left) {
            this.x += INITIAL_SPEED;
        } 

        if(this.y < this.y0) {
            this.vy += GRAVITY;
            this.y += this.vy
        } else {
            this.y = this.y0
            this.movements.isJumping = false;
        }

        this.bullets.forEach((bullet) => bullet.move())
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

    animate() {
        this.animationTick++

        if (this.movements.isJumping && !this.isInMiddle) {
            this.sprite.verticalFrameIndex = 2;
            this.sprite.horizontalFrameIndex = 0;
        } else if (this.movements.isJumping ) {
            this.sprite.verticalFrameIndex = 5;
            this.sprite.horizontalFrameIndex = 0;
        }
        
        
        if (this.animationTick >= PLAYER_ANIMATION && !this.movements.isJumping && !this.movements.right && !this.isInMiddle){
            this.animationTick = 0;
            this.sprite.horizontalFrameIndex++;
            this.sprite.verticalFrameIndex = 0;
           
            if(this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0;
                
            }
        }

        if(this.animationTick >= PLAYER_ANIMATION && this.movements.right && !this.isInMiddle) {
            this.animationTick = 0;
            this.sprite.verticalFrameIndex = 1;
            this.sprite.horizontalFrameIndex++;

            if(this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0;
            }
        }
        
        if(this.animationTick >= PLAYER_ANIMATION && !this.movements.slow) {
            this.animationTick = 0;
            this.sprite.verticalFrameIndex = 3
            ;
            this.sprite.horizontalFrameIndex++;

            if(this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0;
            }
        }

        if(this.animationTick >= PLAYER_ANIMATION && this.movements.slow) {
            this.animationTick = 0;
            this.sprite.verticalFrameIndex = 4
            ;
            this.sprite.horizontalFrameIndex++;

            if(this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0;
            }
        }

        

        
        
    }
}
