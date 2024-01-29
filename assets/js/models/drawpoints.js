class Drawpoints {
    constructor(ctx, x, y, points) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = ORIGINAL_SPEED;
        this.vy = 5;
        this.points = points;

    }

    draw() {
        this.ctx.save();
        this.ctx.fillStyle = '#ffe0d7';
        this.ctx.font = '40px Pixelify Sans'
        this.ctx.fillText(`${this.points}`, this.x, this.y)
        this.ctx.restore();
    }

    move() {
        this.y -= this.vy
    }
}
