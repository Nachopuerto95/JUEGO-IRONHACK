class Fruit {
     constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = FRUIT_W;
        this.h = FRUIT_H;
     }

     draw() {
        this.ctx.fillRect( this.x, this.y, this.w, this.h);
    }

    move() {
       
        
            this.x -= BACKGROUND_SPEED;

    }

}



