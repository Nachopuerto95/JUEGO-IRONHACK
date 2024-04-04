class AudioManager {
    constructor(tour) {
       this.startMusic = new Audio('assets/sounds/1 - Track 1.mp3') 
       this.startFX = new Audio('assets/sounds/sfx13.wav')
       this.startFX.preload = 'auto'
       this.worldMusic = new Audio('assets/sounds/2 - Track 2.mp3')
       this.deathFX = new Audio('assets/sounds/sfx12.wav')
       this.deathMusic = new Audio('assets/sounds/14 Game Over.mp3')
       this.fruitFX = new Audio('assets/sounds/fruit.wav')
       this.jumpFX = new Audio('assets/sounds/jump.wav')
       this.takeFX = new Audio('assets/sounds/take.wav')
       this.rockFX = new Audio('assets/sounds/rock.wav')
       this.pauseFX = new Audio('assets/sounds/pause.wav')
       this.shotFX = new Audio('assets/sounds/shot.wav')

       this.worldMusic.playbackRate = 1;
   

       this.deathMusic.volume = 1;
       this.tour = tour;
    
       this.musicTick = 0

       this.startMusic.volume = 0.02;
        this.startFX.volume = 0.02;
        this.worldMusic.volume = 0.02;
        this.deathFX.volume = 0.02;
        this.deathMusic.volume = 0.02;
        this.fruitFX.volume = 0.06;
        this.jumpFX.volume = 0.06;
        this.takeFX.volume = 0.06;
        this.rockFX.volume = 0.06;
        this.pauseFX.volume = 0.06;
        this.shotFX.volume = 0.06;
    }

    setVolume(volume) {
        this.startMusic.volume = volume;
        this.startFX.volume = volume;
        this.worldMusic.volume = volume;
        this.deathFX.volume = volume;
        this.deathMusic.volume = volume;
        this.fruitFX.volume = volume;
        this.jumpFX.volume = volume;
        this.takeFX.volume = volume;
        this.rockFX.volume = volume;
        this.pauseFX.volume = volume;
        this.shotFX.volume = volume;
    }
    

    playStartMusic() {
        this.startMusic.loop = true;
        this.startMusic.play();
    }
    stopStartMusic() {
        this.startMusic.pause();
        this.startMusic.currentTime = 0;
    }

    playDeathMusic() {
        this.deathMusic.play();
    }

    stopDeathMusic() {
        this.deathMusic.pause();
        this.deathMusic.currentTime = 0;
    }

    playWorldMusic(tour) {
        this.musicTick++
        this.worldMusic.loop = true;
        this.worldMusic.play();
        //console.log(this.worldMusic.playbackRate)
        if (tour > 0 && this.musicTick % 250 === 0) {
            this.worldMusic.pause();
            this.worldMusic.playbackRate += 0.015
            this.worldMusic.play();

        }
    }
    stopWorldMusic() {
        this.worldMusic.pause();
        this.worldMusic.currentTime = 0;
    }
    playStartFX() {   
        this.startFX.play();
    }

    



}