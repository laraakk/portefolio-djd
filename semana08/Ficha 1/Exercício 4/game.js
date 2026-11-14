class RondaScene extends Phaser.Scene {
    constructor() {
        super({ key: "RondaScene" });
    }

    preload() {
        this.load.setBaseURL("https://labs.phaser.io");

        this.load.image("fundo", "assets/skies/space3.png");
        this.load.image("ovni", "assets/sprites/ufo.png");

        this.load.spritesheet("heroi", "assets/sprites/dude.png", {
            frameWidth: 32,
            frameHeight: 48
        });
    }

    create() {
        const larg = this.scale.width;
        const alt = this.scale.height;

        this.add.image(400, 250, "fundo");

        this.heroi = this.physics.add.sprite(400, 300, "heroi", 4);
        this.heroi.setDepth(10);
        this.heroi.setCollideWorldBounds(true);

        this.ovniGrande = this.add.image(600, 150, "ovni");
        this.ovniGrande.setScale(1.5);
        this.ovniGrande.setAngle(-20);

        this.ovnis = [
            this.add.image(60, 60, "ovni"),
            this.add.image(larg - 60, 60, "ovni"),
            this.add.image(60, alt - 60, "ovni"),
            this.add.image(larg - 60, alt - 60, "ovni")
        ];

        this.add.text(10, alt - 10, "RONDA ESPACIAL", {
            fontSize: "20px",
            color: "#FBBF24",
            fontStyle: "bold"
        }).setOrigin(0, 1);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.teclas = this.input.keyboard.addKeys("W,A,S,D");

        this.velocidade = 200;
    }

    update() {
        this.heroi.setVelocity(0);

        if (this.cursors.left.isDown || this.teclas.A.isDown) {
            this.heroi.setVelocityX(-this.velocidade);
        }

        if (this.cursors.right.isDown || this.teclas.D.isDown) {
            this.heroi.setVelocityX(this.velocidade);
        }

        if (this.cursors.up.isDown || this.teclas.W.isDown) {
            this.heroi.setVelocityY(-this.velocidade);
        }

        if (this.cursors.down.isDown || this.teclas.S.isDown) {
            this.heroi.setVelocityY(this.velocidade);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#1E293B",
    scene: [RondaScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    }
};

const game = new Phaser.Game(config);

// Na diagonal, a velocidade é maior porque existem duas componentes de velocidade ao mesmo tempo, uma horizontal e outra vertical.