class ArenaScene extends Phaser.Scene {
    constructor() {
        super({ key: "ArenaScene" });
    }

    preload() {
        this.load.setBaseURL("https://labs.phaser.io");

        this.load.image("fundo", "assets/skies/space3.png");
        this.load.image("logo", "assets/sprites/phaser3-logo.png");
    }

    create() {
        this.add.image(400, 250, "fundo");
        this.add.image(400, 250, "logo").setAlpha(0.25);

        this.add.text(400, 40, "ARENA ESTELAR", {
            fontSize: "36px",
            color: "#FBBF24",
            fontFamily: "Arial",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.add.text(400, 475, "Usa as setas para mover a nave", {
            fontSize: "18px",
            color: "#E2E8F0",
            fontFamily: "Arial"
        }).setOrigin(0.5);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#1E293B",
    scene: [ArenaScene]
};

const game = new Phaser.Game(config);