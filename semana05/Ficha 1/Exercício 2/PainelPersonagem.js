// ═══════════════════════════════════════════════════════════════
// Desenvolvimento de Jogos Digitais · LEEC · ISE/UAlg
// Exercício Guiado · Painel de Personagem
// Completa o código tarefa a tarefa, seguindo o enunciado.
// ═══════════════════════════════════════════════════════════════

// ── Tarefa 1 · Variáveis e selecção de elementos ───────────────
// Declara hp e hpMax (valor 100) e selecciona os 5 elementos pelo id.
let hp = 100;
let hpMax = 100;

let hpDisplay = document.getElementById("hp-display");
let estadoDisplay = document.getElementById("estado-display");
let teclaDisplay = document.getElementById("tecla-display");
let btnAtacar = document.getElementById("btn-atacar");
let btnCurar = document.getElementById("btn-curar");


// ── Tarefa 2 · Função actualizarPainel() ───────────────────────
// Mostra "HP: x / y" no hp-display e chama a função no início.
// (Na Tarefa 5 vais acrescentar código dentro desta função.)



// ── Tarefa 3 · Botão Atacar ────────────────────────────────────
// Clique: HP -15 (mínimo 0), mostra o estado e actualiza o painel.



// ── Tarefa 4 · Botão Curar ─────────────────────────────────────
// Clique: HP +20 (máximo hpMax), mostra o estado e actualiza o painel.



// ── Tarefa 6 · Teclado ─────────────────────────────────────────
// keydown: mostra a última tecla; A ataca e C cura.