class ClicaScene extends Phaser.Scene {
    create() {
        const grafismo = this.add.graphics();

        grafismo.fillStyle(0x3B82F6);
        grafismo.fillTriangle(40, 15, 0, 0, 0, 30);
        grafismo.generateTexture("nave", 40, 30);
        grafismo.destroy();

        this.nave = this.physics.add.sprite(400, 250, "nave");
        this.nave.setCollideWorldBounds(true);

        this.destino = null;

        this.circulo = this.add.circle(0, 0, 10);
        this.circulo.setStrokeStyle(3, 0xFACC15);
        this.circulo.setVisible(false);

        this.input.on("pointerdown", (pointer) => {
            const x = pointer.worldX;
            const y = pointer.worldY;

            this.destino = { x, y };

            this.circulo.setPosition(x, y);
            this.circulo.setVisible(true);

            this.physics.moveTo(this.nave, x, y, 250);

            const angulo = Phaser.Math.Angle.Between(
                this.nave.x,
                this.nave.y,
                x,
                y
            );

            this.nave.setRotation(angulo);
        });
    }

    update() {
        if (this.destino) {
            const distancia = Phaser.Math.Distance.Between(
                this.nave.x,
                this.nave.y,
                this.destino.x,
                this.destino.y
            );

            if (distancia < 5) {
                this.nave.body.reset(this.destino.x, this.destino.y);
                this.destino = null;
                this.circulo.setVisible(false);
            }
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
    scene: ClicaScene
};

const game = new Phaser.Game(config);