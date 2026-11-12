const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

const GRAVIDADE = 0.6;
const FORCA_SALTO = -12;
const CHAO = H - 50;

const jogador = {
    x: 280,
    y: CHAO - 40,
    w: 40,
    h: 40,
    vel: 5,
    vy: 0,
    noChao: true
};

const teclas = {};

let saltos = 0;

function atualizar() {
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

    jogador.vy += GRAVIDADE;
    jogador.y += jogador.vy;

    if (jogador.y + jogador.h >= CHAO) {
        jogador.y = CHAO - jogador.h;
        jogador.vy = 0;
        jogador.noChao = true;
    } else {
        jogador.noChao = false;
    }
}

function desenhar() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "green";
    ctx.fillRect(0, CHAO, W, H - CHAO);

    const altura = CHAO - (jogador.y + jogador.h);
    const larguraSombra = Math.max(8, 40 - altura * 0.15);

    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.beginPath();
    ctx.ellipse(
        jogador.x + jogador.w / 2,
        CHAO + 3,
        larguraSombra,
        5,
        0,
        0,
        Math.PI * 2
    );
    ctx.fill();

    ctx.fillStyle = jogador.noChao ? "yellow" : "orange";
    ctx.fillRect(jogador.x, jogador.y, jogador.w, jogador.h);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Saltos: " + saltos, 20, 30);
    ctx.fillText("Estado: " + (jogador.noChao ? "no chão" : "no ar"), 20, 60);
}

function gameLoop() {
    atualizar();
    desenhar();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(evento) {
    teclas[evento.key] = true;

    if ((evento.code === "Space" || evento.key === "ArrowUp") && jogador.noChao) {
        jogador.vy = FORCA_SALTO;
        jogador.noChao = false;
        saltos++;
    }
});

document.addEventListener("keyup", function(evento) {
    teclas[evento.key] = false;
});

gameLoop();