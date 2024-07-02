//tablero
let tablero;
let anchoTablero = 360;
let alturaTablero = 640;
let contexto;

//nave
let anchoNave = 34; 
let altoNave = 24;
let pos_X_Nave = anchoTablero/8;
let pos_Y_Nave = alturaTablero/2;
let imgNave;

let nave = {
    x : pos_X_Nave,
    y : pos_Y_Nave,
    ancho : anchoNave,
    alto : altoNave
}

//tubos
let arregloTubos = [];
let anchoTubo = 64;
let altoTubo = 512;
let posXTubo = anchoTablero;
let posYTubo = 0;

let imgTuboSuperior;
let imgTuboInferior;

//física
let velocidadX = -2; //velocidad de movimiento de los tubos hacia la izquierda
let velocidadY = 0; //velocidad de salto de la nave
let gravedad = 0.3;

let finJuego = false;
let puntaje = 0;

window.onload = function() {
    tablero = document.getElementById("board");
    tablero.height = alturaTablero;
    tablero.width = anchoTablero;
    contexto = tablero.getContext("2d");

    imgNave = new Image();
    imgNave.src = "./nave.png";
    imgNave.onload = function() {
        contexto.drawImage(imgNave, nave.x, nave.y, nave.ancho, nave.alto);
    }

    imgTuboSuperior = new Image();
    imgTuboSuperior.src = "./tuboSuperior.png";

    imgTuboInferior = new Image();
    imgTuboInferior.src = "./tuboInferior.png";

    requestAnimationFrame(actualizar);
    setInterval(colocarTubos, 1500);
    document.addEventListener("keydown", moverNave);
}

function actualizar() {
    requestAnimationFrame(actualizar);
    if (finJuego) {
        return;
    }
    contexto.clearRect(0, 0, tablero.width, tablero.height);

    //nave
    velocidadY += gravedad;
    // nave.y += velocidadY;
    nave.y = Math.max(nave.y + velocidadY, 0); //aplicar gravedad a la posición actual de nave.y, limitar nave.y a la parte superior del lienzo
    contexto.drawImage(imgNave, nave.x, nave.y, nave.ancho, nave.alto);

    if (nave.y > tablero.height) {
        finJuego = true;
    }

    //tubos
    for (let i = 0; i < arregloTubos.length; i++) {
        let tubo = arregloTubos[i];
        tubo.x += velocidadX;
        contexto.drawImage(tubo.img, tubo.x, tubo.y, tubo.ancho, tubo.alto);

        if (!tubo.pasado && nave.x > tubo.x + tubo.ancho) {
            puntaje += 0.5;
            tubo.pasado = true;
        }

        if (detectarColision(nave, tubo)) {
            finJuego = true;
        }
    }

    //limpiar tubos
    while (arregloTubos.length > 0 && arregloTubos[0].x < -anchoTubo) {
        arregloTubos.shift(); //elimina el primer elemento del arreglo
    }

    //puntaje
    contexto.fillStyle = "green"; 
    contexto.font="45px Orbitron";
    contexto.fillText(puntaje, 5, 45);

    if (finJuego) {
        contexto.fillStyle = "red";
        contexto.fillText("PERDISTE", 5, 90);
    }
}

function colocarTubos() {
    if (finJuego) {
        return;
    }

    //(0-1) * altoTubo/2.
    // 0 -> -128 (altoTubo/4)
    // 1 -> -128 - 256 (altoTubo/4 - altoTubo/2) = -3/4 altoTubo
    let posYTuboAleatoria = posYTubo - altoTubo/4 - Math.random()*(altoTubo/2);
    let espacioApertura = tablero.height/4;

    let tuboSuperior = {
        img : imgTuboSuperior,
        x : posXTubo,
        y : posYTuboAleatoria,
        ancho : anchoTubo,
        alto : altoTubo,
        pasado : false
    }
    arregloTubos.push(tuboSuperior);

    let tuboInferior = {
        img : imgTuboInferior,
        x : posXTubo,
        y : posYTuboAleatoria + altoTubo + espacioApertura,
        ancho : anchoTubo,
        alto : altoTubo,
        pasado : false
    }
    arregloTubos.push(tuboInferior);
}

function moverNave(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        //saltar
        velocidadY = -6;

        //reiniciar juego
        if (finJuego) {
            nave.y = pos_Y_Nave;
            arregloTubos = [];
            puntaje = 0;
            finJuego = false;
        }
    }
}

function detectarColision(nave, tubo) {
    return nave.x < tubo.x + tubo.ancho &&   //la esquina superior izquierda de nave no alcanza la esquina superior derecha de tubo
           nave.x + nave.ancho > tubo.x &&   //la esquina superior derecha de nave pasa la esquina superior izquierda de tubo
           nave.y < tubo.y + tubo.alto &&    //la esquina superior izquierda de nave no alcanza la esquina inferior izquierda de tubo
           nave.y + nave.alto > tubo.y;      //la esquina inferior izquierda de nave pasa la esquina superior izquierda de tubo
}
