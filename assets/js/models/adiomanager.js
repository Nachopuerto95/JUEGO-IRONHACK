class AudioManager {
    constructor() {
       this.startMusic = new Audio('/assets/sounds/1 - Track 1.mp3') 
       this.startFX = new Audio('/assets/sounds/sfx13.wav')
       this.startFX.preload = 'auto'
       this.worldMusic = new Audio('/assets/sounds/2 - Track 2.mp3')
       this.deathFX = new Audio('/assets/sounds/sfx12.wav')
       this.deathMusic = new Audio('/assets/sounds/14 Game Over.mp3')
       this.fruitFX = new Audio('/assets/sounds/fruit.wav')
       this.jumpFX = new Audio('/assets/sounds/jump.wav')
       this.takeFX = new Audio('/assets/sounds/take.wav')
       this.rockFX = new Audio('/assets/sounds/rock.wav')
       this.pauseFX = new Audio('/assets/sounds/pause.wav')
       this.shotFX = new Audio('/assets/sounds/shot.wav')
   

       this.deathMusic.volume = 1;
    }

    

    playStartMusic() {
        this.startMusic.loop = true;
        this.startMusic.play();
    }
    stopStartMusic() {
        this.startMusic.pause();
        this.startMusic.currentTime = 0;
    }

    playWorldMusic() {
        this.worldMusic.loop = true;
        this.worldMusic.play();
    }
    stopWorldMusic() {
        this.worldMusic.pause();
        this.worldMusic.currentTime = 0;
    }
    playStartFX() {   
        this.startFX.play();
    }





}