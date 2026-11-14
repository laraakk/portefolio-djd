class TurboScene extends Phaser.Scene {
    constructor() {
        super({ key: "TurboScene" });
    }

    create() {
        this.add.text(400, 30, "Setas: mover · SHIFT: turbo", {
            fontSize: "22px",
            color: "#FFFFFF"
        }).setOrigin(0.5);

        this.nave = this.add.rectangle(400, 460, 70, 24, 0x22D3EE);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.velocidadeBase = 5;

        this.textoVelocidade = this.add.text(20, 60, "Velocidade: 5", {
            fontSize: "22px",
            color: "#FFFFFF"
        });
    }

    update() {
        let velocidade = this.velocidadeBase;

        if (this.cursors.shift.isDown) {
            velocidade *= 2;
            this.nave.setFillStyle(0xF97316);
            this.textoVelocidade.setText("Velocidade: 10 (TURBO)");
        } else {
            this.nave.setFillStyle(0x22D3EE);
            this.textoVelocidade.setText("Velocidade: 5");
        }

        if (this.cursors.left.isDown) {
            this.nave.x -= velocidade;
        }

        if (this.cursors.right.isDown) {
            this.nave.x += velocidade;
        }

        this.nave.x = Phaser.Math.Clamp(
            this.nave.x,
            this.nave.width / 2,
            this.scale.width - this.nave.width / 2
        );
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#1E293B",
    scene: [TurboScene]
};

const game = new Phaser.Game(config);