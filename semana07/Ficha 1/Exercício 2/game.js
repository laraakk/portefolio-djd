class ArenaScene extends Phaser.Scene {
    constructor() {
        super({ key: "ArenaScene" });
    }

    preload() {
        console.log("Preload a correr");
    }

    create() {
        console.log("Create a correr");
        this.chamadas = 0;
    }

    update() {
        this.chamadas++;

        if (this.chamadas % 60 === 0) {
            console.log("Update chamado " + this.chamadas + " vezes");
        }
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