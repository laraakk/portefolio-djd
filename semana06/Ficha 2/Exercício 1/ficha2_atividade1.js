const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;
const CHAO = H - 100;

ctx.fillStyle = "lightblue";
ctx.fillRect(0, 0, W, H);

function triangulo(x1, y1, x2, y2, x3, y3, cor) {
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
}

triangulo(50, CHAO, 200, 70, 350, CHAO, "gray");
triangulo(250, CHAO, 420, 30, 590, CHAO, "gray");

triangulo(420, 30, 390, 95, 450, 95, "white");

ctx.fillStyle = "green";
ctx.fillRect(0, CHAO, W, H - CHAO);

ctx.fillStyle = "#333333";
ctx.fillRect(250, CHAO, 100, H - CHAO);

for (let x = 285; x < 350; x += 60) {
    ctx.fillStyle = "white";
    ctx.fillRect(x, CHAO + 10, 30, 10);
}

ctx.beginPath();
ctx.moveTo(0, CHAO);
ctx.lineTo(W, CHAO);
ctx.strokeStyle = "#1F2937";
ctx.lineWidth = 3;
ctx.stroke();

function arvore(x) {
    ctx.fillStyle = "brown";
    ctx.fillRect(x - 8, CHAO - 45, 16, 45);

    for (let i = 0; i < 3; i++) {
        const topoY = CHAO - 110 + i * 30;
        const baseY = CHAO - 50 + i * 30;

        triangulo(
            x - 35, baseY,
            x, topoY,
            x + 35, baseY,
            "darkgreen"
        );
    }
}

arvore(100);
arvore(200);
arvore(500);