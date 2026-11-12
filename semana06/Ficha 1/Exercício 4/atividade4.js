const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

let hp = 70;
const HP_MAX = 100;
let vidas = 3;
const pontos = 1250;

function desenharHUD() {

    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, W, H);

    if (vidas === 0) {
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", W / 2, H / 2);
        return;
    }

    ctx.fillStyle = "#333333";
    ctx.fillRect(20, 20, 200, 20);

    if (hp > 50) {
        ctx.fillStyle = "green";
    } else if (hp > 25) {
        ctx.fillStyle = "yellow";
    } else {
        ctx.fillStyle = "red";
    }

    ctx.fillRect(20, 20, hp / HP_MAX * 200, 20);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, 200, 20);

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.textAlign = "left";
    ctx.fillText("HP " + hp + "/" + HP_MAX, 235, 37);

    for (let i = 0; i < vidas; i++) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(30 + i * 30, 80, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "right";
    ctx.fillText("Pontos: " + pontos, W - 20, 85);
}

document.addEventListener("keydown", function(evento) {

    if (vidas === 0) {
        return;
    }

    if (evento.key === "d" || evento.key === "D") {
        hp = hp - 10;

        if (hp <= 0) {
            vidas = vidas - 1;
            hp = HP_MAX;
        }
    }

    if (evento.key === "c" || evento.key === "C") {
        hp = hp + 10;

        if (hp > HP_MAX) {
            hp = HP_MAX;
        }
    }

    desenharHUD();
});

desenharHUD();