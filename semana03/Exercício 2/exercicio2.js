function calcularNivel(pontos){
    if (pontos >=3000) {
        return "Nível 4 — Lenda";
    }       
    else if (pontos >= 1000) {
        return "Nível 3 — Veterano";
    }   
    else if (pontos >= 500) {
        return "Nível 2 — Soldado";
    }       
    else {
        return "Nível 1 — Recruta";
    }
}
// 4 Testes
console.log(calcularNivel(250));
console.log(calcularNivel(750));
console.log(calcularNivel(1500));
console.log(calcularNivel(5000));    
// Testes das fronteiras
console.log(calcularNivel(499));
console.log(calcularNivel(500));
console.log(calcularNivel(999));
console.log(calcularNivel(1000));
console.log(calcularNivel(2999));
console.log(calcularNivel(3000));