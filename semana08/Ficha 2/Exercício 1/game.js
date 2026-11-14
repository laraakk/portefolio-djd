class EspelhoScene extends Phaser.Scene {
    preload() {
        this.load.setBaseURL("https://labs.phaser.io");
        this.load.image("boneco", "assets/sprites/phaser-dude.png");
    }

    create() {
        this.boneco = this.add.sprite(400, 250, "boneco");
        this.boneco.setScale(2);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.teclaEspaco = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.escala = 2;
        this.angulo = 0;
        this.espelhado = false;

        this.texto = this.add.text(10, 10, "", {
            fontSize: "18px",
            color: "#FFFFFF"
        });

        this.atualizarTexto();
    }

    atualizarTexto() {
        this.texto.setText(
            `Escala: ${this.escala} · Ângulo: ${this.angulo}° · Espelhado: ${this.espelhado ? "sim" : "não"}`
        );
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.espelhado = true;
            this.boneco.setFlipX(true);
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            this.espelhado = false;
            this.boneco.setFlipX(false);
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.escala = Math.min(4, this.escala + 0.5);
            this.boneco.setScale(this.escala);
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.escala = Math.max(0.5, this.escala - 0.5);
            this.boneco.setScale(this.escala);
        }

        if (Phaser.Input.Keyboard.JustDown(this.teclaEspaco)) {
            this.angulo += 45;
            this.boneco.setAngle(this.angulo);
        }

        this.atualizarTexto();
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#1E293B",
    scene: EspelhoScene
};

const game = new Phaser.Game(config);