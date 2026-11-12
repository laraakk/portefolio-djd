
const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

ctx.fillStyle = "#0F172A";
ctx.fillRect(0, 0, W, H);

const TAM = 40;
const colunas = W / TAM;

for (let linha = 0; linha < 3; linha++) {

    for (let col = 0; col < colunas; col++) {

        const x = col * TAM;
        const y = H - (linha + 1) * TAM;

        if ((linha + col) % 2 === 0) {
            ctx.fillStyle = "#8B4513";
        } else {
            ctx.fillStyle = "#A0522D";
        }

        ctx.fillRect(x, y, TAM, TAM);

        ctx.strokeStyle = "#333333";
        ctx.strokeRect(x, y, TAM, TAM);
    }
}

let moedas = 0;

for (let i = 0; i < 10; i++) {

    const x = 50 + i * 50;

    if (i % 3 === 0) {
        ctx.fillStyle = "red";
    } else {
        ctx.fillStyle = "yellow";
    }

    ctx.beginPath();
    ctx.arc(x, 150, 12, 0, Math.PI * 2);
    ctx.fill();

    moedas++;
}

ctx.fillStyle = "white";
ctx.font = "24px Arial";
ctx.fillText("Moedas: " + moedas, 20, 35);