const LARGURA = 800;     // largura do ecrã
const TAMANHO = 50;      // largura do jogador e da moeda
const VELOCIDADE = 20;   // píxeis por passo

function moverX(x, direcao) {
    if (direcao === "direita") {
        return x + VELOCIDADE;
    } else if (direcao === "esquerda") {
        return x - VELOCIDADE;
    } else {
        return x;
    }   
}
function limitarAoEcra(x) {
    if (x < 0) {
        return 0;
    } else if (x > LARGURA - TAMANHO) {
        return LARGURA - TAMANHO;
    } else {
        return x;   
    }
}
function colidiu(xJogador, xMoeda) {
    let distancia = xJogador - xMoeda;
    if (distancia < 0) {
        distancia = -distancia;
    }
    return distancia < TAMANHO;
}
function passo(numero, x, direcao, xMoeda) {
    let novaPosicao = moverX(x, direcao);
    novaPosicao = limitarAoEcra(novaPosicao);
    let apanhouMoeda = colidiu(novaPosicao, xMoeda);
    let resultado = "—";
    if (apanhouMoeda) {
        resultado = "Moeda apanhada!";
    }
    console.log("Passo " + numero + " | " + direcao + " | x: " + x + " → " + novaPosicao + " | " + resultado);
    return novaPosicao;
}
let xMoeda = 80;
let x = 10;
x = passo(1, x, "esquerda", xMoeda);
x = passo(2, x, "direita", xMoeda);
x = passo(3, x, "direita", xMoeda);
x = passo(4, x, "esquerda", xMoeda);
x = passo(5, x, "saltar", xMoeda);
// Testes adicionais
console.log("Teste limitarAoEcra(751): ", limitarAoEcra(751));
console.log("Teste colidiu(30, 80): ", colidiu(30, 80));