const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;
const CHAO = H - 50;
const corCeu = "#0F172A";

const estrelas = [];

for (let i = 0; i < 100; i++) {
    estrelas.push({
        x: Math.random() * W,
        y: Math.random() * CHAO,
        r: 1 + Math.random() * 2,
        cor: "white"
    });
}

const estrelaCadente = {
    x: 0,
    y: 80,
    vel: 5
};

function atualizar() {
    for (const estrela of estrelas) {
        if (Math.random() < 0.02) {
            estrela.cor = estrela.cor === "white" ? "gray" : "white";
        }
    }

    estrelaCadente.x += estrelaCadente.vel;
    estrelaCadente.y += estrelaCadente.vel * 0.5;

    if (estrelaCadente.x > W) {
        estrelaCadente.x = -50;
        estrelaCadente.y = Math.random() * (CHAO - 50);
    }
}

function desenhar() {
    ctx.fillStyle = corCeu;
    ctx.fillRect(0, 0, W, H);

    for (const estrela of estrelas) {
        ctx.fillStyle = estrela.cor;
        ctx.beginPath();
        ctx.arc(estrela.x, estrela.y, estrela.r, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(480, 80, 35, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = corCeu;
    ctx.beginPath();
    ctx.arc(495, 65, 35, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(estrelaCadente.x, estrelaCadente.y);
    ctx.lineTo(estrelaCadente.x - 35, estrelaCadente.y - 18);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#1E293B";
    ctx.fillRect(0, CHAO, W, H - CHAO);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Estrelas: " + estrelas.length, 20, 30);
}

function gameLoop() {
    atualizar();
    desenhar();
    requestAnimationFrame(gameLoop);
}

gameLoop();