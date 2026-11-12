/*
GDD: Salta-Caixas é um jogo de reflexos onde o jogador salta por cima de obstáculos que vêm na sua direção. O objetivo é fazer a maior pontuação possível. O jogador perde quando toca num obstáculo. O desafio aumenta porque os obstáculos vêm cada vez mais depressa.
*/

const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

const GRAVIDADE = 0.6;
const FORCA_SALTO = -12;
const CHAO = H - 50;

const jogador = {
    x: 80,
    y: CHAO - 40,
    w: 40,
    h: 40,
    vy: 0,
    noChao: true
};

const teclas = {};
const obstaculos = [];

let velocidade = 5;
let framesAteProximo = 90;
let pontos = 0;
let recorde = 0;
let jogoTerminado = false;

function criarObstaculo() {
    const largura = 20 + Math.random() * 20;
    const altura = 30 + Math.random() * 40;

    obstaculos.push({
        x: W,
        y: CHAO - altura,
        w: largura,
        h: altura
    });

    framesAteProximo = 60 + Math.floor(Math.random() * 61);
}

function colide(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

function atualizar() {
    if (jogoTerminado) {
        return;
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

    framesAteProximo--;

    if (framesAteProximo <= 0) {
        criarObstaculo();
    }

    for (let i = obstaculos.length - 1; i >= 0; i--) {
        const obstaculo = obstaculos[i];

        obstaculo.x -= velocidade;

        if (colide(jogador, obstaculo)) {
            jogoTerminado = true;

            if (pontos > recorde) {
                recorde = pontos;
            }

            return;
        }

        if (obstaculo.x + obstaculo.w < 0) {
            obstaculos.splice(i, 1);
            pontos++;

            if (pontos % 5 === 0) {
                velocidade += 0.5;
            }
        }
    }
}

function desenhar() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "green";
    ctx.fillRect(0, CHAO, W, H - CHAO);

    ctx.fillStyle = jogador.noChao ? "yellow" : "orange";
    ctx.fillRect(jogador.x, jogador.y, jogador.w, jogador.h);

    for (const obstaculo of obstaculos) {
        ctx.fillStyle = "red";
        ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.w, obstaculo.h);
    }

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Pontos: " + pontos, 20, 30);
    ctx.fillText("Velocidade: " + velocidade.toFixed(1), 20, 60);

    ctx.textAlign = "right";
    ctx.fillText("Recorde: " + recorde, W - 20, 30);

    if (jogoTerminado) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(0, 0, W, H);

        ctx.textAlign = "center";
        ctx.fillStyle = "red";
        ctx.font = "48px Arial";
        ctx.fillText("GAME OVER", W / 2, H / 2 - 40);

        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("Pontuação: " + pontos, W / 2, H / 2 + 5);

        if (pontos > 0 && pontos === recorde) {
            ctx.fillStyle = "yellow";
            ctx.fillText("NOVO RECORDE!", W / 2, H / 2 + 45);
        }

        ctx.fillStyle = "white";
        ctx.fillText("Carrega ESPAÇO para recomeçar", W / 2, H / 2 + 85);
    }
}

function reiniciar() {
    jogador.y = CHAO - jogador.h;
    jogador.vy = 0;
    jogador.noChao = true;

    obstaculos.length = 0;

    velocidade = 5;
    framesAteProximo = 90;
    pontos = 0;
    jogoTerminado = false;
}

function gameLoop() {
    atualizar();
    desenhar();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(evento) {
    teclas[evento.code] = true;

    if (
        (evento.code === "Space" || evento.code === "ArrowUp") &&
        !jogoTerminado &&
        jogador.noChao
    ) {
        jogador.vy = FORCA_SALTO;
        jogador.noChao = false;
    }

    if (evento.code === "Space" && jogoTerminado) {
        reiniciar();
    }
});

document.addEventListener("keyup", function(evento) {
    teclas[evento.code] = false;
});

gameLoop();