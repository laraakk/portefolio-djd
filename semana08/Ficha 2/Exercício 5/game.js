class Jogador extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textura, teclas) {
        super(scene, x, y, textura);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.teclas = teclas;
        this.velocidade = 220;
    }

    mover() {
        this.body.setVelocity(0);

        if (this.teclas.esq.isDown) {
            this.body.velocity.x = -this.velocidade;
        } else if (this.teclas.dir.isDown) {
            this.body.velocity.x = this.velocidade;
        }

        if (this.teclas.cima.isDown) {
            this.body.velocity.y = -this.velocidade;
        } else if (this.teclas.baixo.isDown) {
            this.body.velocity.y = this.velocidade;
        }

        this.body.velocity.normalize().scale(this.velocidade);
    }
}

class DoisJogadoresScene extends Phaser.Scene {
    create() {
        const grafismo = this.add.graphics();

        grafismo.fillStyle(0x3B82F6);
        grafismo.fillCircle(20, 20, 20);
        grafismo.generateTexture("azul", 40, 40);

        grafismo.clear();
        grafismo.fillStyle(0xF97316);
        grafismo.fillCircle(20, 20, 20);
        grafismo.generateTexture("laranja", 40, 40);

        grafismo.destroy();

        const teclasAzul = this.input.keyboard.addKeys({
            cima: "W",
            baixo: "S",
            esq: "A",
            dir: "D"
        });

        const teclasLaranja = this.input.keyboard.addKeys({
            cima: "UP",
            baixo: "DOWN",
            esq: "LEFT",
            dir: "RIGHT"
        });

        this.azul = new Jogador(this, 250, 250, "azul", teclasAzul);
        this.laranja = new Jogador(this, 550, 250, "laranja", teclasLaranja);

        this.texto = this.add.text(10, 10, "", {
            fontSize: "20px",
            color: "#FFFFFF"
        });
    }

    update() {
        this.azul.mover();
        this.laranja.mover();

        const distancia = Phaser.Math.Distance.Between(
            this.azul.x,
            this.azul.y,
            this.laranja.x,
            this.laranja.y
        );

        this.texto.setText(`Distância: ${Math.round(distancia)} px`);

        if (distancia < 60) {
            this.texto.setColor("#FF0000");
            this.texto.setText("Apanhado!");
        } else {
            this.texto.setColor("#FFFFFF");
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#0F172A",
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: DoisJogadoresScene
};

const game = new Phaser.Game(config);