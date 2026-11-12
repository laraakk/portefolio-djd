let canvas = document.getElementById("jogo");
let ctx = canvas.getContext("2d");

let W = canvas.width;
let H = canvas.height;

ctx.fillStyle = "#0F172A";
ctx.fillRect(0, 0, W, H);

ctx.fillStyle = "green";
ctx.fillRect(0, H - 60, W, 60);

function circulo(x, y, r, cor) {
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function desenharPersonagem(x, y, cor) {

    ctx.fillStyle = "gray";
    ctx.fillRect(x + 5, y + 50, 10, 20);
    ctx.fillRect(x + 25, y + 50, 10, 20);

    ctx.fillStyle = cor;
    ctx.fillRect(x, y, 40, 50);

    circulo(x + 20, y - 18, 18, cor);

    circulo(x + 13, y - 20, 4, "white");
    circulo(x + 27, y - 20, 4, "white");
}

let posicaoY = H - 60 - 70;

desenharPersonagem(100, posicaoY, "red");
desenharPersonagem(280, posicaoY, "blue");
desenharPersonagem(460, posicaoY, "orange");