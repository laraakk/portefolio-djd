let canvas = document.getElementById("jogo");
let ctx = canvas.getContext("2d");

let W = canvas.width;
let H = canvas.height;

ctx.fillStyle = "lightblue";
ctx.fillRect(0, 0, W, H);

ctx.fillStyle = "green";
ctx.fillRect(0, H - 80, W, 80);

ctx.fillStyle = "yellow";
ctx.beginPath();
ctx.arc(W - 70, 70, 40, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = "red";
ctx.fillRect(100, H - 80 - 120, 150, 120);

ctx.fillStyle = "brown";
ctx.fillRect(155, H - 80 - 60, 40, 60);

ctx.strokeStyle = "white";
ctx.lineWidth = 3;
ctx.strokeRect(115, H - 80 - 100, 40, 40);

ctx.fillStyle = "black";
ctx.font = "24px Arial";
ctx.fillText("A minha primeira cena", 20, 35);