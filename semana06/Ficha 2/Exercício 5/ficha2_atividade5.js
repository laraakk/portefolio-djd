const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

const camadas = [
    { nome: "montanhas", fator: 0.2, offset: 0 },
    { nome: "nuvens", fator: 0.5, offset: 0 },
    { nome: "chao", fator: 1.0, offset: 0 }
];

const funcoesDesenho = [
    desenharMontanhas,
    desenharNuvens,
    desenharChao
];

const teclas = {};

const jogador = {
    x: 100,
    y: H - 110,
    w: 40,
    h: 50
};

let velocidade = 3;
let distancia = 0;

function desenharMontanhas(x0) {
    ctx.fillStyle = "#64748B";
    ctx.beginPath();
    ctx.moveTo(x0, 300);
    ctx.lineTo(x0 + 120, 100);
    ctx.lineTo(x0 + 250, 300);
    ctx.lineTo(x0 + 400, 130);
    ctx.lineTo(x0 + 600, 300);
    ctx.closePath();
    ctx.fill();
}

function desenharNuvens(x0) {
    ctx.fillStyle = "white";

    for (let i = 0; i < 3; i++) {
        const x = x0 + 100 + i * 220;
        const y = 70 + (i % 2) * 35;

        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.arc(x + 25, y - 10, 30, 0, Math.PI * 2);
        ctx.arc(x + 55, y, 25, 0, Math.PI * 2);
        ctx.fill();
    }
}

function desenharChao(x0) {
    ctx.fillStyle = "#166534";
    ctx.fillRect(x0, H - 80, W, 80);

    ctx.strokeStyle = "#86EFAC";
    ctx.lineWidth = 4;

    for (let x = 0; x < W; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x0 + x, H - 40);
        ctx.lineTo(x0 + x + 30, H - 40);
        ctx.stroke();
    }
}

function atualizar() {
    if (teclas["ArrowRight"]) {
        velocidade += 0.1;
    }

    if (teclas["ArrowLeft"]) {
        velocidade -= 0.1;
    }

    velocidade = Math.max(0, Math.min(8, velocidade));

    for (const camada of camadas) {
        camada.offset = (camada.offset + velocidade * camada.fator) % W;
    }

    distancia += velocidade / 60;
}

function desenhar() {
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < camadas.length; i++) {
        const camada = camadas[i];
        const funcao = funcoesDesenho[i];

        funcao(-camada.offset);
        funcao(W - camada.offset);
    }

    ctx.fillStyle = "orange";
    ctx.fillRect(jogador.x, jogador.y, jogador.w, jogador.h);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Velocidade: " + velocidade.toFixed(1), 20, 30);
    ctx.fillText("Distância: " + (distancia / 10).toFixed(1) + " m", 20, 60);
}

function gameLoop() {
    atualizar();
    desenhar();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(evento) {
    teclas[evento.key] = true;
});

document.addEventListener("keyup", function(evento) {
    teclas[evento.key] = false;
});

gameLoop();