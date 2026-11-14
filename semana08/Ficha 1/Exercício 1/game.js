class RondaScene extends Phaser.Scene {
    constructor() {
        super({ key: "RondaScene" });
    }

    preload() {

    }

    create() {
        console.log(this.physics.world.bounds);
    }

    update() {

    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#1E293B",
    scene: [RondaScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    }
};

const game = new Phaser.Game(config);