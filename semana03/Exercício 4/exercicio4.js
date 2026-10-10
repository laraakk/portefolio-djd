const PONTOS_MOEDA = 10;
const PONTOS_INIMIGO = 50;

function calcularPontos(moedas, inimigos) {
    return moedas * PONTOS_MOEDA + inimigos * PONTOS_INIMIGO;
}
function bonusTempo(segundos) {
    if (segundos <= 60) {
        return 500;
    } else if (segundos <= 120) {
        return 200; 
    } else {
        return 0;
    }
}
function atribuirMedalha(pontuacao) {
    if (pontuacao >= 2000) {
        return "Ouro";
    } else if (pontuacao >= 1000) {
        return "Prata";
    } else if (pontuacao >= 500) {
        return "Bronze";
    } else {
        return "Sem medalha";
    }
}
function formatarTempo(segundos) {
    let minutos = Math.floor(segundos / 60);
    let segundosRestantes = segundos % 60;      
    return minutos + " min " + segundosRestantes + " s";
}

let jogador = "Jogador 1";
let moedas = 35;
let inimigos = 12;
let segundos = 95;

let pontos = calcularPontos(moedas, inimigos);
let bonus = bonusTempo(segundos);
let pontuacaoFinal = pontos + bonus;
let medalha = atribuirMedalha(pontuacaoFinal);

console.log("=== Fim de Partida ===");
console.log("Jogador : " + jogador);
console.log("Tempo : " + formatarTempo(segundos));
console.log("Pontos : " + pontos + " + " + bonus + " de bónus = " + pontuacaoFinal);
console.log("Medalha : " + medalha);

console.log("=== Testes ===");
console.log("Bónus aos 60 s:", bonusTempo(60));
console.log("Bónus aos 61 s:", bonusTempo(61));
console.log("Medalha para 499 pontos:", atribuirMedalha(499));
console.log("Medalha para 500 pontos:", atribuirMedalha(500));

// 80 moedas, 20 inimigos, 58 segundos
let pontos2 = calcularPontos(80, 20);
let bonus2 = bonusTempo(58);
let pontuacao2 = pontos2 + bonus2;
console.log("Outra partida 1:", pontos2, "pontos base;", pontuacao2, "pontos finais;", atribuirMedalha(pontuacao2));

// 10 moedas, 2 inimigos, 130 segundos
let pontos3 = calcularPontos(10, 2);
let bonus3 = bonusTempo(130);
let pontuacao3 = pontos3 + bonus3;
console.log("Outra partida 2:", pontos3, "pontos base;", pontuacao3, "pontos finais;", atribuirMedalha(pontuacao3));