class Bird {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.vx = ORIGINAL_SPEED
        this.y = y;
        this.w = 70;;
        this.h = 60;

        this.sprite = new Image();
        this.sprite.src = 'assets/img/Bird.png';
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

        this.lifes = 1;

        this.points = 200;
        
    }

    animate() {
        this.animationTick++

        if (this.animationTick >= BIRD_ANIMATION){
            this.animationTick = 0;
            this.sprite.horizontalFrameIndex++;
           
            if(this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0;
                
            }
        }
    }

    move(currentSpeed) {
        this.isInCanvas = this.x + this.w > 0;
        this.x -= currentSpeed + 4;
        
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
            this.x + this.w > element.x &&
            this.x < element.x + element.w &&
            this.y + this.h > element.y &&
            this.y < element.y + element.h
        );
    }
}
