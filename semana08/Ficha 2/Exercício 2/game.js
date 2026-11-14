class RelogioScene extends Phaser.Scene {
    create() {
        const cx = 400;
        const cy = 250;

        this.segundos = 0;

        const mostrador = this.add.graphics();

        mostrador.fillStyle(0x1E293B);
        mostrador.fillCircle(cx, cy, 180);

        mostrador.lineStyle(3, 0xFFFFFF);
        mostrador.strokeCircle(cx, cy, 180);

        mostrador.fillStyle(0xFACC15);

        for (let i = 0; i < 12; i++) {
            const a = i * Math.PI / 6;
            const x = cx + Math.sin(a) * 160;
            const y = cy - Math.cos(a) * 160;

            mostrador.fillCircle(x, y, 5);
        }

        this.minutos = this.add.rectangle(cx, cy, 8, 130, 0xFFFFFF);
        this.minutos.setOrigin(0.5, 1);

        this.ponteiroSegundos = this.add.rectangle(cx, cy, 4, 160, 0xFF0000);
        this.ponteiroSegundos.setOrigin(0.5, 1);

        this.centro = this.add.circle(cx, cy, 7, 0xFFFFFF);

        this.teclaEspaco = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.texto = this.add.text(10, 10, "Tempo: 0 s", {
            fontSize: "20px",
            color: "#FFFFFF"
        });
    }

    update(time, delta) {
        const velocidade = this.teclaEspaco.isDown ? 60 : 1;

        this.segundos += delta / 1000 * velocidade;

        this.ponteiroSegundos.setAngle(this.segundos * 6);
        this.minutos.setAngle(this.segundos * 0.1);

        this.texto.setText(`Tempo: ${Math.floor(this.segundos)} s`);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#0F172A",
    scene: RelogioScene
};

const game = new Phaser.Game(config);