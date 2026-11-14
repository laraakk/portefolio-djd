class TabuleiroScene extends Phaser.Scene {
    constructor() {
        super({ key: "TabuleiroScene" });
    }

    create() {
        this.add.text(400, 30, "TABULEIRO", {
            fontSize: "28px",
            color: "#FBBF24",
            fontStyle: "bold"
        }).setOrigin(0.5);

        let pecas = 0;

        for (let linha = 0; linha < 8; linha++) {
            for (let coluna = 0; coluna < 8; coluna++) {
                const x = 225 + coluna * 50;
                const y = 95 + linha * 50;

                const escura = (linha + coluna) % 2 === 1;

                this.add.rectangle(
                    x,
                    y,
                    50,
                    50,
                    escura ? 0x334155 : 0xF1F5F9
                );

                if (escura && linha < 3) {
                    this.add.circle(x, y, 18, 0xEF4444);
                    pecas++;
                }
            }
        }

        const moldura = this.add.rectangle(400, 270, 400, 400);
        moldura.setStrokeStyle(4, 0xFACC15);

        this.add.text(700, 270, "Peças: " + pecas, {
            fontSize: "22px",
            color: "#FFFFFF"
        }).setOrigin(0.5);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#1E293B",
    scene: [TabuleiroScene]
};

const game = new Phaser.Game(config);