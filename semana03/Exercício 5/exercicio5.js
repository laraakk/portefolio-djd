function calcularPreco(precoBase, nivel) {
    let desconto;
    if (nivel >= 10) {
        desconto = 20;
    } else if (nivel >= 5) {
        desconto = 10;
    } else {
        desconto = 0;
    }
    return precoBase - precoBase * desconto / 100;
}
function podeComprar(moedas, preco) {
    return moedas >= preco;
}
function moedasEmFalta(moedas, preco) {
    return Math.max(preco - moedas, 0);
}
function comprar(nomeItem, precoBase, moedas, nivel) {
    if (typeof moedas !== "number") {
        console.log("Erro: as moedas têm de ser um número.");
        return;
    }
    let precoFinal = calcularPreco(precoBase, nivel);
    let compraPossivel = podeComprar(moedas, precoFinal);
    console.log("=== Loja ===");
    console.log("Item : " + nomeItem);
    console.log("Preço : " + precoBase + " → " + precoFinal);
    console.log("Moedas : " + moedas);
    if (compraPossivel) {
        let moedasRestantes = moedas - precoFinal;
        console.log("Resultado : Compra feita! Restam " + moedasRestantes + " moedas");
    } else {
        let faltam = moedasEmFalta(moedas, precoFinal);
        console.log("Resultado : Faltam " + faltam + " moedas");    
    }
    console.log("");
}
//Testes
comprar("Espada de Fogo", 250, 300, 7); 
comprar("Espada de Fogo", 250, 200, 2);
comprar("Espada de Fogo", 250, 200, 12);
comprar("Poção", 50, "100", 1);