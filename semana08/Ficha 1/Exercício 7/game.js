class Heroi extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "heroi", 4);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setDepth(10);

        this.velocidade = 200;
        this.direcao = "direita";
    }

    mover(cursors, teclas) {
        this.setVelocity(0);

        if (cursors.left.isDown || teclas.A.isDown) {
            this.setVelocityX(-this.velocidade);
        }

        if (cursors.right.isDown || teclas.D.isDown) {
            this.setVelocityX(this.velocidade);
        }

        if (cursors.up.isDown || teclas.W.isDown) {
            this.setVelocityY(-this.velocidade);
        }

        if (cursors.down.isDown || teclas.S.isDown) {
            this.setVelocityY(this.velocidade);
        }

        this.animar();
    }

    animar() {
        if (this.body.velocity.x < 0) {
            this.direcao = "esquerda";
        }

        if (this.body.velocity.x > 0) {
            this.direcao = "direita";
        }

        if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
            this.anims.play(this.direcao, true);
        } else {
            this.anims.play("parado", true);
        }
    }
}

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

        if (!this.anims.exists("esquerda")) {
            this.anims.create({
                key: "esquerda",
                frames: this.anims.generateFrameNumbers("heroi", {
                    start: 0,
                    end: 3
                }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: "direita",
                frames: this.anims.generateFrameNumbers("heroi", {
                    start: 5,
                    end: 8
                }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: "parado",
                frames: [{ key: "heroi", frame: 4 }],
                frameRate: 10
            });
        }

        this.add.image(400, 250, "fundo");

        this.heroi = new Heroi(this, 400, 300);

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
    }

    update(time, delta) {
        const s = delta / 1000;

        this.heroi.mover(this.cursors, this.teclas);

        this.ovniGrande.x += 120 * s;
        this.ovniGrande.angle += 90 * s;

        if (this.ovniGrande.x > this.scale.width + 60) {
            this.ovniGrande.x = -60;
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