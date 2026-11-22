class Jogador extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "mergulhador");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setGravityY(0);
        this.setImmovable(true);
        this.setDepth(2);
    }

    mover(teclas) {
        this.setVelocityX(0);

        if (teclas.left.isDown) {
            this.setVelocityX(-250);
            this.setFlipX(true);
        }

        if (teclas.right.isDown) {
            this.setVelocityX(250);
            this.setFlipX(false);
        }
    }
}

class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload() {
        this.load.image("fundo-oceano", "assets/fundo-oceano.png");
        this.load.image("mergulhador", "assets/mergulhadora.png");
        this.load.image("moeda", "assets/moeda.png");
        this.load.image("joia", "assets/joia-vermelha.png");
        this.load.image("bau-aberto", "assets/bau-aberto.png");
        this.load.image("medusa", "assets/medusa.png");
        this.load.audio("som-tesouro", "assets/som-tesouro.wav");
    }

    create() {
        this.add.image(400, 250, "fundo-oceano")
            .setDisplaySize(800, 500);

        this.add.rectangle(400, 250, 800, 500, 0x001F33, 0.35);

        this.add.text(400, 85, "TESOUROS DO OCEANO", {
            fontFamily: "Spectral",
            fontSize: "38px",
            color: "#FFFFFF",
            fontStyle: "bold",
            stroke: "#00334D",
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.image(400, 195, "mergulhador")
            .setScale(0.16);

        this.add.text(400, 285, "Recolhe tesouros e evita as medusas!", {
            fontFamily: "Spectral",
            fontSize: "19px",
            color: "#FFFFFF",
            fontStyle: "bold",
            stroke: "#00334D",
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(400, 312, "Moeda: +10 pontos | Joia: +20 pontos | Baú: +30 pontos | Medusa: -1 vida", {
            fontFamily: "Spectral",
            fontSize: "15px",
            color: "#FFFFFF",
            fontStyle: "bold",
            stroke: "#00334D",
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(400, 339, "Começas com 3 vidas. Objetivo: 300 pontos.", {
            fontFamily: "Spectral",
            fontSize: "15px",
            color: "#FFFFFF",
            fontStyle: "bold",
            stroke: "#00334D",
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(400, 360, "Setas esquerda e direita para nadar", {
            fontFamily: "Spectral",
            fontSize: "19px",
            color: "#FFFFFF",
            fontStyle: "bold",
            stroke: "#00334D",
            strokeThickness: 4
        }).setOrigin(0.5);

        const botao = this.add.rectangle(400, 415, 220, 65, 0x087EAC, 1);
        botao.setStrokeStyle(4, 0xFFFFFF);
        botao.setInteractive({ useHandCursor: true });

        this.add.text(400, 415, "JOGAR", {
            fontFamily: "Spectral",
            fontSize: "28px",
            color: "#FFFFFF",
            fontStyle: "bold",
            stroke: "#00334D",
            strokeThickness: 4
        }).setOrigin(0.5);

        botao.on("pointerover", () => {
            botao.setFillStyle(0x00A6D6);
        });

        botao.on("pointerout", () => {
            botao.setFillStyle(0x087EAC);
        });

        botao.on("pointerdown", () => {
            if (this.sound.context) {
                this.sound.context.resume();
            }

            this.scene.start("JogoScene");
        });
    }
}

class JogoScene extends Phaser.Scene {
    constructor() {
        super("JogoScene");
    }

    create() {
        this.pontos = 0;
        this.vidas = 3;
        this.terminou = false;
        this.invulneravel = false;

        this.criarFundo();
        this.criarMergulhador();
        this.criarObjetos();

        this.teclas = this.input.keyboard.createCursorKeys();
        this.teclaR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.textoPontos = this.add.text(25, 20, "Pontuação: 0", {
            fontFamily: "Spectral",
            fontSize: "22px",
            color: "#FFFFFF",
            fontStyle: "bold",
            stroke: "#00334D",
            strokeThickness: 4
        }).setDepth(10);

        this.textoVidas = this.add.text(650, 20, "Vidas: 3", {
            fontFamily: "Spectral",
            fontSize: "22px",
            color: "#FFFFFF",
            fontStyle: "bold",
            stroke: "#00334D",
            strokeThickness: 4
        }).setDepth(10);

        this.physics.add.overlap(
            this.mergulhador,
            this.tesouros,
            this.apanharTesouro,
            null,
            this
        );

        this.physics.add.overlap(
            this.mergulhador,
            this.medusas,
            this.tocarMedusa,
            null,
            this
        );

        this.time.addEvent({
            delay: 1200,
            loop: true,
            callback: this.criarTesouro,
            callbackScope: this
        });

        this.eventoMedusas = this.time.addEvent({
            delay: this.calcularIntervaloMedusas(),
            loop: true,
            callback: this.criarMedusa,
            callbackScope: this
        });
    }

    criarFundo() {
        this.add.image(400, 250, "fundo-oceano")
            .setDisplaySize(800, 500)
            .setDepth(-1);
    }

    // Cria o jogador e impede que saia dos limites do ecrã.
    criarMergulhador() {
        this.mergulhador = new Jogador(this, 400, 420);
        this.mergulhador.setScale(0.10);

        this.mergulhador.body.setSize(
            this.mergulhador.width * 0.95,
            this.mergulhador.height * 0.60
        );
    }

    // Cria os grupos de tesouros e medusas.
    criarObjetos() {
        this.tesouros = this.physics.add.group();
        this.medusas = this.physics.add.group();
    }

    // Escolhe aleatoriamente o tipo de tesouro e os pontos atribuídos.
    criarTesouro() {
        const sorteio = Phaser.Math.Between(1, 100);

        let tipo;

        if (sorteio <= 70) {
            tipo = { imagem: "moeda", pontos: 10, tamanho: 45 };
        } else if (sorteio <= 95) {
            tipo = { imagem: "joia", pontos: 20, tamanho: 48 };
        } else {
            tipo = { imagem: "bau-aberto", pontos: 30, tamanho: 60 };
        }

        const x = Phaser.Math.Between(40, 760);

        const tesouro = this.tesouros.create(x, -40, tipo.imagem);

        tesouro.pontos = tipo.pontos;
        tesouro.setDisplaySize(tipo.tamanho, tipo.tamanho);
        tesouro.setVelocityY(this.calcularVelocidadeObjetos());
    }

    // Escolhe a posição e cria uma medusa com movimento vertical.
    criarMedusa() {
        const x = Phaser.Math.Between(40, 760);

        const medusa = this.medusas.create(x, -45, "medusa");

        medusa.setDisplaySize(65, 75);
        medusa.setVelocityY(this.calcularVelocidadeObjetos());
    }

    tocarSomTesouro() {
        this.sound.play("som-tesouro");
    }

    // Atualiza a pontuação, reproduz o som e verifica a vitória.
    apanharTesouro(mergulhador, tesouro) {
        if (!tesouro.active || this.terminou) {
            return;
        }

        this.pontos = Math.min(300, this.pontos + tesouro.pontos);
        this.textoPontos.setText("Pontuação: " + this.pontos);
        this.eventoMedusas.delay = this.calcularIntervaloMedusas();

        this.tocarSomTesouro();
        tesouro.destroy();

        if (this.pontos >= 300) {
            this.terminarJogo("VITÓRIA!");
        }
    }

    // Retira uma vida e ativa temporariamente a invulnerabilidade.
    tocarMedusa(mergulhador, medusa) {
        if (!medusa.active || this.terminou || this.invulneravel) {
            return;
        }

        medusa.destroy();
        this.vidas--;

        this.textoVidas.setText("Vidas: " + this.vidas);

        this.invulneravel = true;
        this.mergulhador.setTint(0xFF0000);

        this.time.delayedCall(1500, () => {
            this.invulneravel = false;
            this.mergulhador.clearTint();
        });

        if (this.vidas <= 0) {
            this.terminarJogo("FIM DE JOGO!");
        }
    }

    // Termina a partida, interrompe a física e apresenta o resultado.
    terminarJogo(mensagem) {
        if (this.terminou) {
            return;
        }

        this.terminou = true;
        this.physics.pause();
        this.time.removeAllEvents();

        this.add.text(400, 220, mensagem, {
            fontFamily: "Spectral",
            fontSize: "38px",
            color: "#FFFFFF",
            fontStyle: "bold",
            stroke: "#00334D",
            strokeThickness: 4,
            align: "center"
        }).setOrigin(0.5);

        this.add.text(400, 275, "Pressiona R para jogar novamente", {
            fontFamily: "Spectral",
            fontSize: "20px",
            color: "#FFFFFF",
            fontStyle: "bold",
            stroke: "#00334D",
            strokeThickness: 4,
            align: "center"
        }).setOrigin(0.5);
    }

    update() {
        if (this.terminou) {
            if (Phaser.Input.Keyboard.JustDown(this.teclaR)) {
                this.scene.restart();
            }

            return;
        }

        this.mergulhador.mover(this.teclas);

        for (const objeto of [
            ...this.tesouros.getChildren(),
            ...this.medusas.getChildren()
        ]) {
            if (objeto.y - objeto.displayHeight / 2 > 500) {
                objeto.destroy();
            }
        }
    }

    // Aumenta a velocidade dos objetos conforme a pontuação.
    calcularVelocidadeObjetos() {
        const aumento = Math.min(Math.floor(this.pontos / 50) * 40, 200);

        return 100 + aumento;
    }

    // Reduz o intervalo entre medusas à medida que a pontuação aumenta.
    calcularIntervaloMedusas() {
        if (this.pontos >= 200) {
            return 600;
        }

        if (this.pontos >= 100) {
            return 900;
        }

        return 1500;
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#087EAC",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MenuScene, JogoScene]
};

const jogo = new Phaser.Game(config);