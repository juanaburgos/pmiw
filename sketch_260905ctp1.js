let chicoFrames = [];
let imgFondo;
let imgMicro;

let chicoX, chicoY;
let microX, microY;

let estado = 0;

// tiempo y velocidad
let frameChico = 0;
let tiempoUltimoFrame = 0;
let velocidadAnimacion = 100;
let tiempoInicioEstado = 0;

function preload() {
  imgFondo = loadImage("fondo.jpeg");
  imgMicro = loadImage("micro.png");

  for (let i = 0; i < 5; i++) {
    chicoFrames[i] = loadImage("personaje" + (i + 1) + ".png");
  }
}

function setup() {
  createCanvas(800, 600);
  reiniciarEscena();
}

function draw() {
  image(imgFondo, 0, 0, width, height);

  // maquina de estados (if / else)
  if (estado == 0) {
    velocidadAnimacion = 120;
    if (tiempoTranscurrido() > 2000) {
      cambiarEstado(1);
    }
  } else if (estado == 1) {
    chicoX = chicoX + 4;
    velocidadAnimacion = 70;
    if (chicoX > 80) {
      cambiarEstado(2);
    }
  } else if (estado == 2) {
    microX = microX + 6;
    chicoX = chicoX + 3.5;
    velocidadAnimacion = 90;
    if (microX > width + 200) {
      cambiarEstado(3);
    }
  } else if (estado == 3) {
    chicoX = chicoX + 2;
    velocidadAnimacion = 150;
    if (chicoX > width + 100) {
      reiniciarEscena();
    }
  }

  // micro 
  if (microX < width + 400) {
    image(imgMicro, microX, microY, 720, 420);
  }

  // chico
  reproducirAnimacion(chicoFrames, chicoX, chicoY);
}

// funciones propias
function reproducirAnimacion(imagenes, x, y) {
  if (millis() - tiempoUltimoFrame > velocidadAnimacion) {
    frameChico = (frameChico + 1) % imagenes.length;
    tiempoUltimoFrame = millis();
  }
  image(imagenes[frameChico], x, y, 130, 130);
}

function cambiarEstado(nuevoEstado) {
  estado = nuevoEstado;
  tiempoInicioEstado = millis();
}

function tiempoTranscurrido() {
  return millis() - tiempoInicioEstado;
}

function reiniciarEscena() {
  chicoX = -120;
  chicoY = 370;
  microX = 100;
  microY = 200;
  cambiarEstado(0);
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    reiniciarEscena();
  }
}
