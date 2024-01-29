class Spider {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.vx = ORIGINAL_SPEED;
        this.vy = 5;
        this.y = y;
        this.w = 65;;
        this.h = 65;

        this.sprite = new Image();
        this.sprite.src = 'assets/img/spider.png';
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 1;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = this.sprite.width / this.sprite.horizontalFrames;
            this.sprite.frameHeight = this.sprite.height / this.sprite.verticalFrames;
        }
        

        this.animationTick = 0;

        this.isInCanvas = true;

        this.lifes = 1;

        this.sum = true;

        this.points = 250;
        
    }


    move(currentSpeed) {

        
        this.isInCanvas = this.x + this.w > 0;
        this.x -= currentSpeed;

        if (this.sum) {
            this.y += this.vy;
            if (this.y >= 450) {
              this.sum = false;
            }
          } else {
            this.y -= this.vy;
            if (this.y <= 100) {
              this.sum = true;
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
        } 
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
