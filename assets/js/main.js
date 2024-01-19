// Este script solo se ejecuta cuando la ventana se haya cargado por completo
// window es un objeto que hace referancia a la ventana del navegador

// las arrow function, al utilizar this se refiere al scope anterior

window.addEventListener('load', () => { 
    const game = new Game('main-canvas')            // carga una constante que hace referencia a un objeto de la clase main en el vanvas seleccionado
    game.start();

    document.addEventListener('keydown', (event) => game.onKeyEvent(event));
    document.addEventListener('keyup', (event) => game.onKeyEvent(event));
})