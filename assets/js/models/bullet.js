class Bullet {

    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = SPEED_BULLETX;
        this.vy = SPEED_BULLETY; 
        this.w = 35;
        this.h = 35;
        this.gravity = BULLET_GRAVITY;

        this.sprite = new Image();
        this.spriteReverse = new Image();
        this.sprite.src = '/assets/img/bullet.png';
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 4;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames) -1;
            this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
        }

        this.animationTick = 0;
        
    }

    move() {
        
            this.x += this.vx + SPEED_MOVE / 3;
            this.y += this.vy;
            this.vy += this.gravity; 
        
            

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
            this.animate()
        }
    }

    animate() {
        this.animationTick++

        
        if (this.animationTick >= BULLET_ANIMATION){
            this.animationTick = 0;
            this.sprite.horizontalFrameIndex++;
           
            if(this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0;
            }
        }
    }
}