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

class JogoScene extends Phaser.Scene {

    constructor() {
        super({ key: "JogoScene" });
    }

    create() {
        criarTexturas(this);

        this.jogador = this.physics.add.sprite(
            LARGURA / 2,
            ALTURA - 30,
            "jogador"
        );

        this.jogador.setCollideWorldBounds(true);

        this.velocidade = 320;

        this.cursors = this.input.keyboard.createCursorKeys();

        this.estrelas = this.physics.add.group();

        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(20, LARGURA - 20);

            const estrela = this.estrelas.create(
                x,
                -20 - i * 100,
                "estrela"
            );

            estrela.setVelocityY(150);
        }

        this.pontos = 0;

        this.textoPontos = this.add.text(
            20,
            16,
            "Pontos: 0",
            ESTILO
        );

        this.physics.add.overlap(
            this.jogador,
            this.estrelas,
            this.apanharEstrela,
            null,
            this
        );
    }

    update() {
        if (this.cursors.left.isDown) {
            this.jogador.setVelocityX(-this.velocidade);
        }
        else if (this.cursors.right.isDown) {
            this.jogador.setVelocityX(this.velocidade);
        }
        else {
            this.jogador.setVelocityX(0);
        }
    }

    apanharEstrela(jogador, estrela) {
        estrela.destroy();

        this.pontos += 10;

        this.textoPontos.setText("Pontos: " + this.pontos);
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
            debug: true
        }
    }
};

new Phaser.Game(config);