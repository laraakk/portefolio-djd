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