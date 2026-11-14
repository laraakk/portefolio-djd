const MUNDO_L = 2400;

class CorredorScene extends Phaser.Scene {
    preload() {
        this.load.setBaseURL("https://labs.phaser.io");
        this.load.image("fundo", "assets/skies/space3.png");
        this.load.spritesheet("heroi", "assets/sprites/dude.png", {
            frameWidth: 32,
            frameHeight: 48
        });
    }

    create() {
        this.physics.world.setBounds(0, 0, MUNDO_L, 500);

        this.add.tileSprite(0, 0, MUNDO_L, 500, "fundo").setOrigin(0);

        for (let x = 0; x <= MUNDO_L; x += 400) {
            this.add.text(x, 450, `${x} px`, {
                fontSize: "16px",
                color: "#FFFFFF"
            });
        }

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

        this.heroi = this.physics.add.sprite(100, 400, "heroi", 4);
        this.heroi.setScale(2);
        this.heroi.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.teclaShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.cameras.main.setBounds(0, 0, MUNDO_L, 500);
        this.cameras.main.startFollow(this.heroi, true, 0.1, 0.1);

        this.texto = this.add.text(10, 10, "Parado", {
            fontSize: "20px",
            color: "#FFFFFF"
        });

        this.texto.setScrollFactor(0);
        this.texto.setDepth(10);
    }

    update() {
        const aCorrer = this.teclaShift.isDown;
        const velocidade = aCorrer ? 320 : 160;

        this.heroi.setVelocityX(0);
        this.heroi.anims.timeScale = aCorrer ? 2 : 1;

        if (this.cursors.left.isDown) {
            this.heroi.setVelocityX(-velocidade);
            this.heroi.anims.play("esquerda", true);
            this.texto.setText(aCorrer ? "A correr" : "A andar");
        } else if (this.cursors.right.isDown) {
            this.heroi.setVelocityX(velocidade);
            this.heroi.anims.play("direita", true);
            this.texto.setText(aCorrer ? "A correr" : "A andar");
        } else {
            this.heroi.anims.play("parado", true);
            this.texto.setText("Parado");
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
    scene: CorredorScene
};

const game = new Phaser.Game(config);