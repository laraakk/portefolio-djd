function calcularAtaque(arma, forca) {
    if (arma === "espada") {
        return forca * 3;
    } else if (arma === "arco") {
        return forca * 2;
    } else if (arma === "magia") {
        return forca * 4;
    } else {
        return 0;
    }
}
function eCritico(numeroTurno) {
    return numeroTurno % 3 === 0;
}
function estadoDragao(vida) {
    if (vida > 60) {
        return "Furioso";
    } else if (vida > 0) {
        return "Ferido";
    } else {
        return "Derrotado";
    }
}
function turno(numero, vida, arma, forca) {
    let dano = calcularAtaque(arma, forca);
    let critico = eCritico(numero);
    if (critico) {
        dano = dano * 2;
    }
    let novaVida = Math.max(vida - dano, 0);
    let textoDano = "dano " + dano;
    if (critico) {
        textoDano += " CRÍTICO!";
    }
    console.log(
        "Turno " + numero + " | " + arma + " | " + textoDano + " | vida " + vida + " → " + novaVida + " | " + estadoDragao(novaVida));
    return novaVida;
}

const VIDA_DRAGAO = 150;
let forca = 10;
let vida = VIDA_DRAGAO;
console.log("=== Batalha contra o Dragão ===");
vida = turno(1, vida, "arco", forca);
vida = turno(2, vida, "espada", forca);
vida = turno(3, vida, "magia", forca);
vida = turno(4, vida, "pedra", forca);
vida = turno(5, vida, "espada", forca);