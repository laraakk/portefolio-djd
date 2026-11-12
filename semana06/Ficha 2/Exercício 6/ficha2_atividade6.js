const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

const teclas = {};

const raquete = {
    x: W / 2 - 50,
    y: H - 35,
    w: 100,
    h: 12,
    vel: 7
};

const bola = {
    x: W / 2,
    y: H / 2,
    r: 10,
    dx: 3,
    dy: 4,
    velocidade: 5
};

let pontos = 0;
let vidas = 3;
let toques = 0;
let jogoTerminado = false;

function lancarBola() {
    bola.x = W / 2;
    bola.y = H / 2;
    bola.velocidade = 5;
    bola.dx = 3;
    bola.dy = 4;
}

function atualizar() {
    if (jogoTerminado) {
        return;
    }

    if (teclas["ArrowLeft"]) {
        raquete.x -= raquete.vel;
    }

    if (teclas["ArrowRight"]) {
        raquete.x += raquete.vel;
    }

    if (raquete.x < 0) {
        raquete.x = 0;
    }

    if (raquete.x + raquete.w > W) {
        raquete.x = W - raquete.w;
    }

    bola.x += bola.dx;
    bola.y += bola.dy;

    if (bola.x - bola.r <= 0) {
        bola.x = bola.r;
        bola.dx = Math.abs(bola.dx);
    }

    if (bola.x + bola.r >= W) {
        bola.x = W - bola.r;
        bola.dx = -Math.abs(bola.dx);
    }

    if (bola.y - bola.r <= 0) {
        bola.y = bola.r;
        bola.dy = Math.abs(bola.dy);
    }

    if (
        bola.dy > 0 &&
        bola.y + bola.r >= raquete.y &&
        bola.y - bola.r < raquete.y + raquete.h &&
        bola.x + bola.r >= raquete.x &&
        bola.x - bola.r <= raquete.x + raquete.w
    ) {
        bola.y = raquete.y - bola.r;

        const impacto = (bola.x - (raquete.x + raquete.w / 2)) / (raquete.w / 2);

        bola.dx = impacto * 5;
        bola.dy = -Math.sqrt(bola.velocidade * bola.velocidade - bola.dx * bola.dx);

        pontos++;
        toques++;

        if (toques % 5 === 0) {
            bola.velocidade *= 1.1;
        }
    }

    if (bola.y - bola.r > H) {
        vidas--;

        if (vidas === 0) {
            jogoTerminado = true;
        } else {
            lancarBola();
        }
    }
}

function desenhar() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Pontos: " + pontos, 20, 30);
    ctx.fillText("Vidas: " + vidas, 20, 60);

    ctx.fillStyle = "blue";
    ctx.fillRect(raquete.x, raquete.y, raquete.w, raquete.h);

    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, bola.r, 0, Math.PI * 2);
    ctx.fill();

    if (jogoTerminado) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = "red";
        ctx.font = "48px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", W / 2, H / 2 - 30);

        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("Pontuação: " + pontos, W / 2, H / 2 + 15);
        ctx.fillText("Carrega ENTER para reiniciar", W / 2, H / 2 + 55);
    }
}

function reiniciar() {
    raquete.x = W / 2 - raquete.w / 2;
    pontos = 0;
    vidas = 3;
    toques = 0;
    jogoTerminado = false;
    lancarBola();
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