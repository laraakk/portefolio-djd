class EstrelaScene extends Phaser.Scene {
    constructor() {
        super({ key: "EstrelaScene" });
    }

    create() {
        this.jogador = this.add.rectangle(400, 250, 36, 36, 0x3B82F6);

        this.estrela = this.add.circle(0, 0, 14, 0xFACC15);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.pontos = 0;
        this.terminou = false;

        this.textoPontos = this.add.text(20, 20, "Pontos: 0", {
            fontSize: "22px",
            color: "#FFFFFF"
        });

        this.moverEstrela();
    }

    moverEstrela() {
        this.estrela.x = Phaser.Math.Between(30, 770);
        this.estrela.y = Phaser.Math.Between(30, 470);
    }

    update() {
        if (this.terminou) {
            return;
        }

        const velocidade = 5;

        if (this.cursors.left.isDown) {
            this.jogador.x -= velocidade;
        }

        if (this.cursors.right.isDown) {
            this.jogador.x += velocidade;
        }

        if (this.cursors.up.isDown) {
            this.jogador.y -= velocidade;
        }

        if (this.cursors.down.isDown) {
            this.jogador.y += velocidade;
        }

        this.jogador.x = Phaser.Math.Clamp(this.jogador.x, 18, 782);
        this.jogador.y = Phaser.Math.Clamp(this.jogador.y, 18, 482);

        const distancia = Phaser.Math.Distance.Between(
            this.jogador.x,
            this.jogador.y,
            this.estrela.x,
            this.estrela.y
        );

        if (distancia < 32) {
            this.pontos++;

            this.textoPontos.setText("Pontos: " + this.pontos);

            if (this.pontos >= 10) {
                this.terminou = true;
                this.estrela.setVisible(false);

                this.add.text(400, 250, "Ganhaste!", {
                    fontSize: "48px",
                    color: "#22C55E",
                    fontStyle: "bold"
                }).setOrigin(0.5);
            } else {
                this.moverEstrela();
            }
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#1E293B",
    scene: [EstrelaScene]
};

const game = new Phaser.Game(config);