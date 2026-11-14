class CarroScene extends Phaser.Scene {
    create() {
        const grafismo = this.add.graphics();

        grafismo.fillStyle(0xDC2626);
        grafismo.fillRoundedRect(0, 0, 48, 28, 6);

        grafismo.fillStyle(0x1E293B);
        grafismo.fillRoundedRect(32, 5, 11, 18, 3);

        grafismo.generateTexture("carro", 48, 28);
        grafismo.destroy();

        this.carro = this.physics.add.sprite(400, 250, "carro");
        this.carro.setCollideWorldBounds(true);

        this.velocidade = 0;

        this.cursors = this.input.keyboard.createCursorKeys();

        this.texto = this.add.text(10, 10, "Velocidade: 0 px/s", {
            fontSize: "20px",
            color: "#FFFFFF"
        });
    }

    update(time, delta) {
        const segundos = delta / 1000;

        if (this.cursors.up.isDown) {
            this.velocidade += 300 * segundos;
            this.velocidade = Math.min(this.velocidade, 300);
        } else if (this.cursors.down.isDown) {
            this.velocidade -= 300 * segundos;
            this.velocidade = Math.max(this.velocidade, -150);
        } else {
            if (this.velocidade > 0) {
                this.velocidade = Math.max(0, this.velocidade - 200 * segundos);
            } else if (this.velocidade < 0) {
                this.velocidade = Math.min(0, this.velocidade + 200 * segundos);
            }
        }

        if (Math.abs(this.velocidade) > 10) {
            if (this.cursors.left.isDown) {
                this.carro.setAngularVelocity(-180);
            } else if (this.cursors.right.isDown) {
                this.carro.setAngularVelocity(180);
            } else {
                this.carro.setAngularVelocity(0);
            }
        } else {
            this.carro.setAngularVelocity(0);
        }

        this.physics.velocityFromRotation(
            this.carro.rotation,
            this.velocidade,
            this.carro.body.velocity
        );

        this.texto.setText(`Velocidade: ${Math.round(this.velocidade)} px/s`);
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
    scene: CarroScene
};

const game = new Phaser.Game(config);