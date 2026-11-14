class BolaScene extends Phaser.Scene {
    constructor() {
        super({ key: "BolaScene" });
    }

    create() {
        this.bola = this.add.circle(400, 250, 20, 0xFBBF24);

        this.vx = 4;
        this.vy = 3;

        this.ressaltos = 0;

        this.textoRessaltos = this.add.text(20, 20, "Ressaltos: 0", {
            fontSize: "22px",
            color: "#FFFFFF"
        });
    }

    update() {
        this.bola.x += this.vx;
        this.bola.y += this.vy;

        if (
            this.bola.x - this.bola.radius <= 0 ||
            this.bola.x + this.bola.radius >= this.scale.width
        ) {
            this.vx *= -1;
            this.ressaltar();
        }

        if (
            this.bola.y - this.bola.radius <= 0 ||
            this.bola.y + this.bola.radius >= this.scale.height
        ) {
            this.vy *= -1;
            this.ressaltar();
        }
    }

    ressaltar() {
        this.ressaltos++;

        this.textoRessaltos.setText("Ressaltos: " + this.ressaltos);

        this.bola.setFillStyle(
            Phaser.Math.Between(0x000000, 0xFFFFFF)
        );
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#1E293B",
    scene: [BolaScene]
};

const game = new Phaser.Game(config);