    class Snail {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.vx =  BACKGROUND_SPEED
        this.y = y;
        this.w = 100;;
        this.h = 100;

        this.sprite = new Image();
        this.sprite.src = 'assets/img/snailSprite.png';
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 2;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = this.sprite.width / this.sprite.horizontalFrames;
            this.sprite.frameHeight = this.sprite.height / this.sprite.verticalFrames;
        }

        this.animationTick = 0;

        this.isInCanvas = true;
        
    }

    animate() {
        this.animationTick++

        if (this.animationTick >= PLAYER_ANIMATION){
            this.animationTick = 0;
            this.sprite.horizontalFrameIndex++;
           
            if(this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0;
                
            }
        }
    }

    move() {
        this.isInCanvas = this.x + this.w > 0;
        this.x -= BACKGROUND_SPEED;
        
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
    }

    clear(){

    }

    collidesWith (element) {
        return (
            this.x + this.w - 20 > element.x &&
            this.x + 10 < element.x + element.w &&
            this.y + this.h - 10 > element.h   &&
            this.y + 10 < element.y + element.h
        );
    }
}
