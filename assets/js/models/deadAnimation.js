class DeathAnimation {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.frameIndex = 0;
        this.tick = 0;

        this.sprite = new Image();
        this.sprite.src = '/assets/img/deathanimation.png';
        this.sprite.verticalFrames = 1;
        this.sprite.horizontalFrames = 3;  // Ajusta según el número de frames en la animación de muerte
        this.sprite.isReady = false;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = this.sprite.width / this.sprite.horizontalFrames;
            this.sprite.frameHeight = this.sprite.height / this.sprite.verticalFrames;
        };
    }

    animate() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.frameIndex * this.sprite.frameWidth,
                0,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.sprite.frameWidth,
                this.sprite.frameHeight
            );

            this.tick++;
            if (this.tick >= DEATH_ANIMATION_DURATION) {
                return
            }

            if (this.tick % 3 === 0) {  // Ajusta el número según la velocidad de la animación
                this.frameIndex++;
                if (this.frameIndex > this.sprite.horizontalFrames - 1) {
                    this.frameIndex = 4;
                }
            }
        }
    }

    draw() {
        if (this.sprite.isReady && this.tick < DEATH_ANIMATION_DURATION) {
    
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

    move(currentSpeed) {

        this.x -= currentSpeed;
        
    }
}