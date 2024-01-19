class Background {

    constructor(ctx, player) {

        this.ctx = ctx;
        this.x = 0;
        this.vx = BACKGROUND_SPEED;
        this.y = 0;
        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;

        this.player = player;

        this.movements = {
            left: false,
            right: false,
            
        }

        this.sprite = new Image();
        this.sprite.src = '/assets/img/Background.png';
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }
    }

   

    onKeyEvent(event) {

        const enabled = event.type === 'keydown'; 
        if (event.keyCode === KEY_RIGHT) {
                this.movements.right = enabled;
        }
    }

    move() {
        if (this.player.x > this.ctx.canvas.width / 2 - this.player.w && !this.player.movements.slow) {
            this.x -= this.vx;
        } else if (this.player.x > this.ctx.canvas.width / 2 - this.player.w && this.player.movements.slow)  {
            this.x -= this.vx * SLOWED_GAME
        }



        if (this.x < -this.w) {
            this.x = 0;
        }
    }


    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y,
                this.w,
                this.h
            )
            this.ctx.drawImage(
                this.sprite,
                this.x + this.w,
                this.y,
                this.w,
                this.h
            )
        }
    }

}