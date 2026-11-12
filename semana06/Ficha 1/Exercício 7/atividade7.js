const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

// GDD: Dodge Master é um jogo de reflexos em que o jogador controla um quadrado na horizontal para evitar círculos que caem do topo do ecrã. O objetivo é sobreviver o máximo de tempo possível. Cada círculo evitado aumenta a pontuação e a dificuldade aumenta progressivamente através do aumento da velocidade de queda. O jogo termina quando um círculo toca no jogador.

const jogador = {
    x: W / 2 - 20,
    y: H - 60,
    w: 40,
    h: 40,
    vel: 5
};

const teclas = {};
const inimigos = [];

let evitados = 0;
let velQueda = 2;
let frames = 0;
let jogoTerminado = false;

function criarInimigo() {
    const raio = 12 + Math.random() * 10;
    const x = raio + Math.random() * (W - raio * 2);

    inimigos.push({
        x: x,
        y: -raio,
        raio: raio
    });
}

function colideCirculoQuadrado(circulo, quadrado) {
    const pontoX = Math.max(quadrado.x, Math.min(circulo.x, quadrado.x + quadrado.w));
    const pontoY = Math.max(quadrado.y, Math.min(circulo.y, quadrado.y + quadrado.h));

    const distanciaX = circulo.x - pontoX;
    const distanciaY = circulo.y - pontoY;

    return distanciaX * distanciaX + distanciaY * distanciaY < circulo.raio * circulo.raio;
}

function atualizar() {
    if (jogoTerminado) {
        return;
    }

    frames++;

    if (teclas["ArrowLeft"]) {
        jogador.x -= jogador.vel;
    }

    if (teclas["ArrowRight"]) {
        jogador.x += jogador.vel;
    }

    if (jogador.x < 0) {
        jogador.x = 0;
    }

    if (jogador.x + jogador.w > W) {
        jogador.x = W - jogador.w;
    }

    if (frames % 40 === 0) {
        criarInimigo();
    }

    if (frames % 300 === 0) {
        velQueda += 0.5;
    }

    for (let i = inimigos.length - 1; i >= 0; i--) {
        const inimigo = inimigos[i];

        inimigo.y += velQueda;

        if (colideCirculoQuadrado(inimigo, jogador)) {
            jogoTerminado = true;
            return;
        }

        if (inimigo.y - inimigo.raio > H) {
            inimigos.splice(i, 1);
            evitados++;
        }
    }
}

function desenhar() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "blue";
    ctx.fillRect(jogador.x, jogador.y, jogador.w, jogador.h);

    for (const inimigo of inimigos) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(inimigo.x, inimigo.y, inimigo.raio, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Evitados: " + evitados, 20, 30);
    ctx.fillText("Velocidade: " + velQueda.toFixed(1), 20, 60);

    if (jogoTerminado) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = "red";
        ctx.font = "48px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", W / 2, H / 2 - 20);

        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("Pontuação final: " + evitados, W / 2, H / 2 + 25);
        ctx.fillText("Carrega ENTER para reiniciar", W / 2, H / 2 + 65);
    }
}

function reiniciar() {
    jogador.x = W / 2 - 20;
    inimigos.length = 0;
    evitados = 0;
    velQueda = 2;
    frames = 0;
    jogoTerminado = false;
}

function gameLoop() {
    atualizar();
    desenhar();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(evento) {
    teclas[evento.key] = true;

    if (evento.key === "Enter" && jogoTerminado) {
        reiniciar();
    }
});

document.addEventListener("keyup", function(evento) {
    teclas[evento.key] = false;
});

gameLoop();