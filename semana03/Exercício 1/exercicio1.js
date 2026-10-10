function calcularDano(forca, nivelArma, critico) {
    let danoBase = forca * nivelArma;
    if (critico==true) {
        return danoBase * 2;
    } else {
        return danoBase;
    }
}
let forca    = 15
let nivelArma = 3
let critico  = true

let danoFinal = calcularDano(forca, nivelArma, critico);
console.log("Dano causado:", danoFinal);  
console.log("Dano causado:", calcularDano(10, 2, false));  
console.log("Dano causado:", calcularDano(20, 5, true)); 