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

        this.velocidadeQueda = 150;

        this.jogador = this.physics.add.sprite(
            LARGURA / 2,
            ALTURA - 30,
            "jogador"
        );

        this.jogador.setCollideWorldBounds(true);

        this.velocidade = 320;

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
        if (this.cursors.left.isDown) {
            this.jogador.setVelocityX(-this.velocidade);
        }
        else if (this.cursors.right.isDown) {
            this.jogador.setVelocityX(this.velocidade);
        }
        else {
            this.jogador.setVelocityX(0);
        }

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
        meteoro.destroy();

        this.vidas--;

        this.textoVidas.setText("Vidas: " + this.vidas);
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