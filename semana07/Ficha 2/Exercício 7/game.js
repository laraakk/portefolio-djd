class GaleriaScene extends Phaser.Scene {
    constructor() {
        super({ key: "GaleriaScene" });
    }

    preload() {
        this.load.setBaseURL("https://labs.phaser.io");

        this.load.image("fundo", "assets/skies/space3.png");
        this.load.image("logo", "assets/sprites/phaser3-logo.png");
        this.load.image("brilho", "assets/particles/red.png");
    }

    create() {
        this.add.image(400, 250, "fundo");

        this.add.image(400, 150, "logo").setScale(0.6);

        for (let i = 0; i < 5; i++) {
            const brilho = this.add.image(200 + i * 100, 340, "brilho");
            brilho.setScale(0.5 + i * 0.25);
        }

        this.add.text(400, 450, "Galeria Phaser", {
            fontSize: "28px",
            color: "#FFFFFF"
        }).setOrigin(0.5);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#1E293B",
    scene: [GaleriaScene]
};

const game = new Phaser.Game(config);