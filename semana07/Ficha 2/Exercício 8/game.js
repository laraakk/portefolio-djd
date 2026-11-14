class TituloScene extends Phaser.Scene {
    constructor() {
        super({ key: "TituloScene" });
    }

    create() {
        this.add.text(400, 180, "DESAFIO DOS 5 SEGUNDOS", {
            fontSize: "36px",
            color: "#FBBF24",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.add.text(400, 280, "Carrega ESPAÇO para começar", {
            fontSize: "24px",
            color: "#FFFFFF"
        }).setOrigin(0.5);

        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.start("JogoScene");
        });
    }
}

class JogoScene extends Phaser.Scene {
    constructor() {
        super({ key: "JogoScene" });
    }

    create() {
        this.frames = 0;
        this.toques = 0;

        this.add.text(400, 100, "Carrega ESPAÇO o máximo de vezes possível!", {
            fontSize: "22px",
            color: "#FFFFFF"
        }).setOrigin(0.5);

        this.textoTempo = this.add.text(400, 220, "5", {
            fontSize: "96px",
            color: "#FBBF24"
        }).setOrigin(0.5);

        this.textoToques = this.add.text(400, 350, "Toques: 0", {
            fontSize: "28px",
            color: "#FFFFFF"
        }).setOrigin(0.5);

        this.input.keyboard.on("keydown-SPACE", () => {
            this.toques++;
            this.textoToques.setText("Toques: " + this.toques);
        });
    }

    update() {
        this.frames++;

        const segundos = 5 - Math.floor(this.frames / 60);

        if (segundos > 0) {
            this.textoTempo.setText(segundos);
        } else {
            this.scene.start("FimScene", { toques: this.toques });
        }
    }
}

class FimScene extends Phaser.Scene {
    constructor() {
        super({ key: "FimScene" });
    }

    init(dados) {
        this.toques = dados.toques;
    }

    create() {
        this.add.text(400, 140, "Tempo esgotado!", {
            fontSize: "40px",
            color: "#EF4444",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.add.text(400, 240, "Fizeste " + this.toques + " toques", {
            fontSize: "32px",
            color: "#FFFFFF"
        }).setOrigin(0.5);

        this.add.text(400, 340, "R: repetir · M: menu", {
            fontSize: "24px",
            color: "#FBBF24"
        }).setOrigin(0.5);

        this.input.keyboard.once("keydown-R", () => {
            this.scene.start("JogoScene");
        });

        this.input.keyboard.once("keydown-M", () => {
            this.scene.start("TituloScene");
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#1E293B",
    scene: [TituloScene, JogoScene, FimScene]
};

const game = new Phaser.Game(config);