class Fruit {
     constructor(ctx, x, y, spr) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = FRUIT_W;
        this.h = FRUIT_H;

        this.lifes = 1;

        this.sprite = new Image();
        this.sprite.src = 'assets/img/fruits.png';
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 3;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = this.sprite.width / this.sprite.horizontalFrames;
            this.sprite.frameHeight = this.sprite.height / this.sprite.verticalFrames;
        }

        this.spr = spr;


     }

     draw() {
      
      

      if (this.sprite.isReady) {
    
         this.ctx.drawImage(
             this.sprite,
             this.spr * this.sprite.frameWidth,
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

    move(currentSpeed) {
       
        
            this.x -= currentSpeed;

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



