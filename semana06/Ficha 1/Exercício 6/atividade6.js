const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

const jogador = {
    x: 280,
    y: 180,
    w: 40,
    h: 40,
    vel: 4
};

const moeda = {
    x: 0,
    y: 0,
    tam: 20
};

const teclas = {};

let pontos = 0;

function novaMoeda() {
    moeda.x = Math.random() * (W - moeda.tam);
    moeda.y = Math.random() * (H - moeda.tam);
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

    if (teclas["ArrowUp"]) {
        jogador.y = jogador.y - jogador.vel;
    }

    if (teclas["ArrowDown"]) {
        jogador.y = jogador.y + jogador.vel;
    }

    if (teclas["ArrowLeft"]) {
        jogador.x = jogador.x - jogador.vel;
    }

    if (teclas["ArrowRight"]) {
        jogador.x = jogador.x + jogador.vel;
    }

    if (jogador.x < 0) {
        jogador.x = 0;
    }

    if (jogador.x + jogador.w > W) {
        jogador.x = W - jogador.w;
    }

    if (jogador.y < 0) {
        jogador.y = 0;
    }

    if (jogador.y + jogador.h > H) {
        jogador.y = H - jogador.h;
    }

    if (colide(jogador, {
        x: moeda.x,
        y: moeda.y,
        w: moeda.tam,
        h: moeda.tam
    })) {
        pontos++;
        novaMoeda();
    }
}

function desenhar() {

    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "blue";
    ctx.fillRect(jogador.x, jogador.y, jogador.w, jogador.h);

    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(
        moeda.x + moeda.tam / 2,
        moeda.y + moeda.tam / 2,
        moeda.tam / 2,
        0,
        Math.PI * 2
    );
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Moedas: " + pontos, 20, 35);
}

function gameLoop() {
    atualizar();
    desenhar();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(e) {
    teclas[e.key] = true;
});

document.addEventListener("keyup", function(e) {
    teclas[e.key] = false;
});

novaMoeda();
gameLoop();