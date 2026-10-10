function calcularDano(forca, defesa, critico){
    let danoBase = Math.max(forca - defesa, 1);
    if (critico == true){ 
        danoBase = danoBase *2;
    }
    return danoBase; 
}
function aplicarDano(vidaAtual, dano){
    let novaVida = Math.max(vidaAtual - dano, 0);
    return novaVida;
}
function verificarEstado(vida) {
    if (vida > 0) {
        return "Vivo";
    }
    else {
        return "Derrotado";
    }
}
function relatorioCombate(nomeInimigo, vidaInicial, vidaFinal, dano, critico) {
    console.log("=== Relatório de Combate ===");
    console.log("Inimigo : " + nomeInimigo);
    console.log("Vida : " + vidaInicial + " → " + vidaFinal);
    if (critico == true) {
        console.log("Dano : " + dano + " (CRÍTICO!)");
    }
    else {
        console.log("Dano : " + dano);
    }
    console.log("Estado : " + verificarEstado(vidaFinal));
    console.log("----------------------------");
}
let nomeInimigo = "Goblin";
let vidaInimigo = 30;
let forca = 12;
let defesa = 4;
let critico = true;
let dano = calcularDano(forca, defesa, critico);
let novaVida = aplicarDano(vidaInimigo, dano);
relatorioCombate(nomeInimigo, vidaInimigo, novaVida, dano, critico);

critico = false;
let dano2 = calcularDano(forca, defesa, critico);
let vidaFInal = aplicarDano(novaVida, dano2);
relatorioCombate(nomeInimigo, novaVida, vidaFInal, dano2, critico);

console.log("Teste de dano minímo: ", calcularDano(3, 10, false));
console.log("Teste de vida miníma: ", aplicarDano(5, 20));
console.log("Estado final do teste: ", verificarEstado(aplicarDano(5, 20)));