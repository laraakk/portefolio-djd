const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

const HUD = 60;

let alvo = {
    x: 0,
    y: 0,
    r: 0
};

let acertos = 0;
let falhas = 0;
let frames = 0;
let terminado = false;

function novoAlvo() {
    alvo.r = 15 + Math.random() * 20;
    alvo.x = alvo.r + Math.random() * (W - alvo.r * 2);
    alvo.y = HUD + alvo.r + Math.random() * (H - HUD - alvo.r * 2);
}

function desenhar() {
    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Acertos: " + acertos, 20, 30);
    ctx.fillText("Falhas: " + falhas, 20, 55);

    const tempo = Math.max(0, 30 - Math.floor(frames / 60));

    ctx.textAlign = "right";
    ctx.fillStyle = tempo <= 5 ? "red" : "white";
    ctx.fillText("Tempo: " + tempo + "s", W - 20, 30);

    if (!terminado) {
        const cores = ["red", "white", "red"];

        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = cores[i];
            ctx.beginPath();
            ctx.arc(alvo.x, alvo.y, alvo.r * (3 - i) / 3, 0, Math.PI * 2);
            ctx.fill();
        }
    } else {
        const total = acertos + falhas;
        const precisao = total === 0 ? 0 : (acertos / total) * 100;

        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(0, 0, W, H);

        ctx.textAlign = "center";
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("Tempo esgotado!", W / 2, H / 2 - 50);

        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("Acertos: " + acertos, W / 2, H / 2);
        ctx.fillText("Precisão: " + precisao.toFixed(1) + "%", W / 2, H / 2 + 40);
        ctx.fillText("Clica para recomeçar", W / 2, H / 2 + 85);
    }
}

function atualizar() {
    if (terminado) {
        return;
    }

    frames++;

    if (frames >= 1800) {
        terminado = true;
    }
}

function reiniciar() {
    acertos = 0;
    falhas = 0;
    frames = 0;
    terminado = false;
    novoAlvo();
}

function gameLoop() {
    atualizar();
    desenhar();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener("click", function(e) {
    if (terminado) {
        reiniciar();
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const ratoX = e.clientX - rect.left;
    const ratoY = e.clientY - rect.top;

    const dx = ratoX - alvo.x;
    const dy = ratoY - alvo.y;
    const distancia = Math.sqrt(dx * dx + dy * dy);

    if (distancia < alvo.r) {
        acertos++;
        novoAlvo();
    } else {
        falhas++;
    }
});

novoAlvo();
gameLoop();