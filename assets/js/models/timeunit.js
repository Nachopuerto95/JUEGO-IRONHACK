class Timeunit {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 10;
        this.h = 35;



    }


    draw() {
        this.ctx.save();
    
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = '#ffc8b8';
        this.ctx.fillStyle = 'red';
        
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.ctx.strokeRect(this.x, this.y, this.w, this.h);

    
        this.ctx.restore();
    }
}