const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

let x = W / 2;
let y = H / 2;

const R = 20;

let dx = 4;
let dy = 3;

const cores = ["red", "yellow", "blue", "green", "orange"];
let corAtual = 0;

let ressaltos = 0;
let pausado = false;

function atualizar() {

    if (pausado) {
        return;
    }

    x = x + dx;
    y = y + dy;

    if (x + R >= W || x - R <= 0) {
        dx = -dx;
        corAtual = (corAtual + 1) % cores.length;
        ressaltos++;
    }

    if (y + R >= H || y - R <= 0) {
        dy = -dy;
        corAtual = (corAtual + 1) % cores.length;
        ressaltos++;
    }
}

function desenhar() {

    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = cores[corAtual];
    ctx.beginPath();
    ctx.arc(x, y, R, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Ressaltos: " + ressaltos, 20, 35);

    if (pausado) {
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("PAUSA", W / 2, H / 2);
    }
}

function gameLoop() {

    atualizar();
    desenhar();

    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(evento) {

    if (evento.code === "Space") {
        pausado = !pausado;
    }
});

gameLoop();