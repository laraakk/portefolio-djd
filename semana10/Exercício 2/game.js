
const LARGURA = 800;
const ALTURA = 500;

const ESTILO = {
    fontSize: "22px",
    color: "#ffffff",
    fontFamily: "Arial"
};

function criarTexturas(scene) {
    if (scene.textures.exists("jogador")) {
        return;
    }

    const g = scene.add.graphics();

    g.fillStyle(0x22C55E);
    g.fillRoundedRect(0, 0, 60, 20, 6);
    g.generateTexture("jogador", 60, 20);
    g.clear();

    g.fillStyle(0xFBBF24);
    g.fillTriangle(10, 0, 20, 10, 10, 20);
    g.fillTriangle(10, 0, 0, 10, 10, 20);
    g.generateTexture("estrela", 20, 20);
    g.clear();

    g.fillStyle(0xEF4444);
    g.fillCircle(12, 12, 12);
    g.generateTexture("meteoro", 24, 24);

    g.destroy();
}

class Jogador extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "jogador");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.velocidade = 320;
        this.invulneravel = false;
    }

    mover(cursors) {
        if (cursors.left.isDown) {
            this.setVelocityX(-this.velocidade);
        }
        else if (cursors.right.isDown) {
            this.setVelocityX(this.velocidade);
        }
        else {
            this.setVelocityX(0);
        }
    }

    sofrerDano() {
        this.invulneravel = true;

        this.setTint(0xEF4444);

        this.scene.time.delayedCall(1000, () => {
            this.invulneravel = false;
            this.clearTint();
        });
    }
}

class JogoScene extends Phaser.Scene {

    constructor() {
        super({ key: "JogoScene" });
    }

    create() {
        criarTexturas(this);

        this.terminou = false;
        this.velocidadeQueda = 150;

        this.jogador = new Jogador(
            this,
            LARGURA / 2,
            ALTURA - 30
        );

        this.cursors = this.input.keyboard.createCursorKeys();

        this.estrelas = this.physics.add.group();
        this.meteoros = this.physics.add.group();

        this.pontos = 0;

        this.textoPontos = this.add.text(
            20,
            16,
            "Pontos: 0",
            ESTILO
        );

        this.vidas = 3;

        this.textoVidas = this.add.text(
            LARGURA - 20,
            16,
            "Vidas: 3",
            ESTILO
        );

        this.textoVidas.setOrigin(1, 0);

        this.textoObjetos = this.add.text(
            LARGURA / 2,
            16,
            "",
            ESTILO
        );

        this.textoObjetos.setOrigin(0.5, 0);

        this.physics.add.overlap(
            this.jogador,
            this.estrelas,
            this.apanharEstrela,
            null,
            this
        );

        this.physics.add.overlap(
            this.jogador,
            this.meteoros,
            this.tocarMeteoro,
            null,
            this
        );

        this.time.addEvent({
            delay: 800,
            loop: true,
            callback: this.largarObjeto,
            callbackScope: this
        });
    }

    update() {
        if (this.terminou) {
            return;
        }

        this.jogador.mover(this.cursors);

        for (const grupo of [this.estrelas, this.meteoros]) {
            for (const objeto of [...grupo.getChildren()]) {
                if (objeto.y > ALTURA + 30) {
                    objeto.destroy();
                }
            }
        }

        this.textoObjetos.setText(
            "Objetos: " +
            (this.estrelas.getChildren().length +
            this.meteoros.getChildren().length)
        );
    }

    largarObjeto() {
        const x = Phaser.Math.Between(20, LARGURA - 20);
        let objeto;

        if (Phaser.Math.Between(1, 100) <= 30) {
            objeto = this.meteoros.create(x, -20, "meteoro");
        }
        else {
            objeto = this.estrelas.create(x, -20, "estrela");
        }

        objeto.setVelocityY(this.velocidadeQueda);
    }

    apanharEstrela(jogador, estrela) {
        estrela.destroy();

        this.pontos += 10;

        this.textoPontos.setText("Pontos: " + this.pontos);
    }

    tocarMeteoro(jogador, meteoro) {
        if (jogador.invulneravel || this.terminou) {
            return;
        }

        meteoro.destroy();

        this.vidas--;

        this.textoVidas.setText("Vidas: " + this.vidas);

        if (this.vidas <= 0) {
            this.fimDeJogo();
            return;
        }

        jogador.sofrerDano();
    }

    fimDeJogo() {
        this.terminou = true;

        this.physics.pause();
        this.time.removeAllEvents();

        this.jogador.setTint(0x64748B);

        const textoFim = this.add.text(
            LARGURA / 2,
            ALTURA / 2 - 40,
            "Game Over!",
            {
                fontSize: "64px",
                color: "#EF4444",
                fontFamily: "Arial",
                fontStyle: "bold"
            }
        );

        textoFim.setOrigin(0.5);

        const textoPontuacao = this.add.text(
            LARGURA / 2,
            ALTURA / 2 + 30,
            "Pontuação final: " + this.pontos + " · R: recomeçar",
            ESTILO
        );

        textoPontuacao.setOrigin(0.5);

        this.input.keyboard.once("keydown-R", () => {
            this.scene.restart();
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: LARGURA,
    height: ALTURA,
    backgroundColor: "#0F172A",
    scene: JogoScene,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

new Phaser.Game(config);
// Dentro da classe Jogador usamos this porque representa o próprio jogador.
// Na JogoScene usamos this.jogador porque precisamos de aceder ao objeto jogador.