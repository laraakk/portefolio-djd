class CronometroScene extends Phaser.Scene {
    constructor() {
        super({ key: "CronometroScene" });
    }

    create() {
        this.frames = 0;

        this.add.text(400, 150, "CRONÓMETRO", {
            fontSize: "32px",
            color: "#E2E8F0"
        }).setOrigin(0.5);

        this.textoTempo = this.add.text(400, 260, "00:00", {
            fontSize: "96px",
            color: "#22D3EE",
            fontFamily: "Courier New"
        }).setOrigin(0.5);
    }

    update() {
        this.frames++;

        const totalSegundos = Math.floor(this.frames / 60);
        const minutos = Math.floor(totalSegundos / 60);
        const segundos = totalSegundos % 60;

        const tempoFormatado = 
            String(minutos).padStart(2, "0") + ":" +
            String(segundos).padStart(2, "0");

        this.textoTempo.setText(tempoFormatado);

        if (totalSegundos >= 10) {
            this.textoTempo.setColor("#EF4444");
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#1E293B",
    scene: [CronometroScene]
};

const game = new Phaser.Game(config);