class SemaforoScene extends Phaser.Scene {
    constructor() {
        super({ key: "SemaforoScene" });
    }

    create() {
        this.add.text(400, 40, "SEMÁFORO", {
            fontSize: "32px",
            color: "#FFFFFF",
            fontFamily: "Arial",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.add.rectangle(400, 420, 20, 80, 0x64748B);

        const caixa = this.add.rectangle(400, 230, 120, 300, 0x111827);
        caixa.setStrokeStyle(4, 0xFACC15);

        this.add.circle(400, 140, 40, 0xEF4444);

        this.add.circle(400, 230, 40, 0xF59E0B)
            .setAlpha(0.25);

        this.add.circle(400, 320, 40, 0x22C55E)
            .setAlpha(0.25);

        this.add.text(400, 480, "PARE", {
            fontSize: "28px",
            color: "#EF4444",
            fontFamily: "Arial",
            fontStyle: "bold"
        }).setOrigin(0.5);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#1E293B",
    scene: [SemaforoScene]
};

const game = new Phaser.Game(config);