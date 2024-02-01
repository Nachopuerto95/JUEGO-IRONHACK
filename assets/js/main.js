// Este script solo se ejecuta cuando la ventana se haya cargado por completo
// window es un objeto que hace referancia a la ventana del navegador

// las arrow function, al utilizar this se refiere al scope anterior

window.addEventListener('load', () => { 
    let game = new Game('main-canvas')          
    let selectedButtonIndex = 0;
    let selectedGOButtonIndex = 0;
    const panel = document.getElementById('start-panel');

    let  drawIntervalId = undefined;

    const startButtons = document.querySelectorAll('.game-button');
    const GameOverButtons = document.querySelectorAll('.game-over-buttons')
    const tryAgainBtn = document.getElementById('try-again-btn');
    

    const backBtn2 = document.getElementById('btn-back2')
    const backBtn = document.getElementById('btn-back')
    const playGameBtn = document.getElementById('play-game')
    const playGamePanel = document.getElementById('play-game-panel')

    
    const mainCanvas = document.getElementById('main-canvas')
    const pressToStart = document.getElementById('press-start')
    const startGamePanel = document.getElementById('startgame-panel')
    const gameOverPanel = document.getElementById('game-over-panel')
    const startPanelLogo = document.getElementById('startgame-panel-text')
    const controlsPanel = document.getElementById('controls-panel')
    const audioManager = new AudioManager()

    let gameStarted = false;
    let gameMenu = false;
    let pressStartText = false;
    let showStartPanel = false;
    let showControlsPanel = false
    let showPlayGamePanel = true
    let deathSound = false;
    let pauseSound = false;

    const saveBtn = document.getElementById('save-name');
    const playerNameInput = document.getElementById('name-input');
    const scorePanel = document.getElementById('scores-panel')

    const scoresList = document.getElementById('allScores')

    const volumeSlider = document.getElementById('volumeSlider')
    


    
    let scoreMenu = false;

    
    audioManager.setVolume(0.05)
    addScores()
    musicPlayer()

    volumeSlider.addEventListener('input', function() {
       
        const volumeValue = parseFloat(volumeSlider.value);

        // Llama a la función setVolume con el nuevo valor
        audioManager.setVolume(volumeValue);
    });

    function musicPlayer() {

        
        if (!drawIntervalId) {
            drawIntervalId = setInterval(() => {
            
                

                if (gameStarted && !showStartPanel && !game.gameIsOver && !gameMenu) {
                    audioManager.playWorldMusic(game.player.playerTour);
                } else {
                    audioManager.stopWorldMusic();
                }

                if (showStartPanel || gameMenu || showControlsPanel || scoreMenu) {
                    audioManager.playStartMusic();
                } else {
                    audioManager.stopStartMusic();
                }

                if(game.gameIsOver && !deathSound) {
                    deathSound = true
                    audioManager.deathFX.play();

                    setTimeout(() => {
                        audioManager.deathMusic.play();
                    }, 500)
                } 

                if (game.gamePaused){
                    audioManager.worldMusic.pause();
                }

                if (game.gamePaused && !pauseSound){
                    pauseSound = true;
                    audioManager.pauseFX.play();
                    
                }
    
               
            }, FPS);
        }
    }
    

    function moveStartPanel() {
        setTimeout(() => {
            startPanelLogo.style.left = "0"
        }, 1)
        
        
    }


    pressToStartFN()

    function reStart() {
        game = new Game('main-canvas')
        game.start();
        gameStarted = true;
        deathSound = false;
    }

    function pressToStartFN() {
        setInterval(() => {
            if(showStartPanel && pressStartText){
                pressToStart.classList.add('hidden');
                pressStartText = false;
            } else if (showStartPanel && !pressStartText) {
                pressToStart.classList.remove('hidden');
                pressStartText = true;
            }
        },800)
    }
    
    playGameBtn.addEventListener('click', () => { // BACK TO MENU BUTTON (CONTROL PANEL)
       if(showPlayGamePanel) {
        playGamePanel.classList.add('hidden')
        audioManager.startFX.currentTime = 0; 
        audioManager.playStartFX();
        pressStartText = true;
        showStartPanel = true;
        showPlayGamePanel = false;

        startGamePanel.classList.remove('hidden');
        moveStartPanel()
       }
})

    backBtn.addEventListener('click', () => { // BACK TO MENU BUTTON (CONTROL PANEL)
        audioManager.startFX.currentTime = 0; 
        audioManager.playStartFX();
        controlsPanel.classList.add('hidden')
        gameMenu = true;
        panel.classList.remove('hidden');
        showControlsPanel = false;
})
    backBtn2.addEventListener('click', () => { // BACK TO MENU BUTTON (SCORE PANEL)
            audioManager.startFX.currentTime = 0; 
            audioManager.playStartFX();
            panel.classList.remove('hidden')
            scorePanel.classList.add('hidden')
            gameMenu = true;
            scoreMenu = false;

    })

    startButtons[0].addEventListener('click', () => {   // START BUTTON


        if (gameMenu) {
            
            gameMenu = false
            panel.classList.add('hidden')

            if(game) {
                mainCanvas.classList.remove('hidden')
                reStart();
            }else{
                start();
            }
            
            audioManager.startFX.currentTime = 0; 
            audioManager.playStartFX();

        }
    
        
    }); 
    startButtons[1].addEventListener('click', () => { // CONTROLS BUTTON
        audioManager.startFX.currentTime = 0; 
        audioManager.playStartFX();
        panel.classList.add('hidden');
        controlsPanel.classList.remove('hidden')
        gameMenu = false
        showControlsPanel = true

    }); 
    startButtons[2].addEventListener('click', () => { // SCORE BUTTON
        audioManager.startFX.currentTime = 0; 
        audioManager.playStartFX();
        gameMenu = false
        scoreMenu = true;
        scorePanel.classList.remove('hidden');
        panel.classList.add('hidden');
        
    }); 
    
    tryAgainBtn.addEventListener('click', () => { // TRY AGAIN BUTTON (GAME OVER PANEL)
        audioManager.startFX.currentTime = 0; 
        audioManager.playStartFX();
        panel.classList.remove('hidden');
        gameMenu = true;
        gameOverPanel.classList.add('hidden')
        mainCanvas.classList.add('hidden')
        
        game.gameIsOver = false;
        scoreMenu = false;
    });
    saveBtn.addEventListener('click', () => { // SAVE BUTTON (GAME OVER PANEL)
        audioManager.startFX.currentTime = 0; 
        audioManager.playStartFX();
        const playerName = playerNameInput.value;
        game.saveScoreName(playerName);
        mainCanvas.classList.add('hidden')
        tryAgainBtn.click();

        
    })
    
    document.addEventListener('keydown', (event) => {
        if (game.gameIsOver && !gameMenu && !scoreMenu) { 
            
            handleGameOverInput(event);
        } else if (gameMenu && !game.gameIsOver && !scoreMenu) {
            
            handleMenuInput(event);
        } else if (scoreMenu) {
            
            handleScoresInput(event)
        } else if (showStartPanel) {
            
            handleStartInput(event);
        }else if (showControlsPanel) {
            
            handleControlsInput(event);
        }else{
            game.onKeyEvent(event);
        }
    });

    document.addEventListener('keyup', (event) => {
        if (!gameMenu && !game.gameIsOver) {
            game.onKeyEvent(event);
        }
    });

    function handleStartInput(event) {

        if (event.key === 'Enter') {

            audioManager.playStartFX()
            event.preventDefault()
            showStartPanel = false;
            gameMenu = true;
            startGamePanel.classList.add('hidden')
            panel.classList.remove('hidden')
        }
        

    }


    function handleControlsInput(event) {
        
        if (event.key === 'Enter') {
            event.preventDefault()
            backBtn.click();
        }
    }

    function handleScoresInput(event) {
        
        if (event.key === 'Enter') {
            event.preventDefault()
            backBtn2.click();
        }
    }

    function handleMenuInput(event) {


        if (event.key === 'Enter') {
            event.preventDefault();
            startButtons[selectedButtonIndex].click();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            audioManager.startFX.currentTime = 0; 
            audioManager.playStartFX();
            selectedButtonIndex = (selectedButtonIndex - 1 + startButtons.length) % startButtons.length;
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            audioManager.startFX.currentTime = 0; 
            audioManager.playStartFX();
            selectedButtonIndex = (selectedButtonIndex + 1) % startButtons.length;
        }

        startButtons.forEach((button, index) => {
            if (index === selectedButtonIndex) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        });
    }

    function handleGameOverInput(event) {
        playerNameInput.focus();
        if (event.key === 'Enter') {
            event.preventDefault();
            GameOverButtons[selectedGOButtonIndex].click();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            audioManager.startFX.currentTime = 0; 
            audioManager.playStartFX();
            selectedGOButtonIndex = (selectedGOButtonIndex - 1 + GameOverButtons.length) % GameOverButtons.length;
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            audioManager.startFX.currentTime = 0; 
            audioManager.playStartFX();
            selectedGOButtonIndex = (selectedGOButtonIndex + 1) % GameOverButtons.length;
        }

        GameOverButtons.forEach((button, index) => {
            if (index === selectedGOButtonIndex) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        });
    }

    function addScores() {

        
        const scores = localStorage.getItem(SCORE_KEY) ? JSON.parse(localStorage.getItem(SCORE_KEY)) : {}
        const scoresArr = Object.entries(scores).map(([name, points]) => ({ name, points }));
        
        scoresArr.sort((a, b) => b.points - a.points);

        if (scoresArr.length > 5) {
            scoresArr.splice(5);
        }

        scoresArr.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = item.name + ': ' + item.points;
            scoresList.appendChild(listItem);
        })
        
    }

    
});