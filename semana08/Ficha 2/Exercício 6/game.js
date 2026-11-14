const MUNDO_L = 3200;

class ParalaxeScene extends Phaser.Scene {
    create() {
        this.cameras.main.setBounds(0, 0, MUNDO_L, 500);

        this.input.keyboard.addKeys({
            esquerda: "LEFT",
            direita: "RIGHT",
            shift: "SHIFT"
        });

        this.teclas = this.input.keyboard.addKeys({
            esquerda: "LEFT",
            direita: "RIGHT",
            shift: "SHIFT"
        });

        this.criarEstrelas(120, 1, 0.2, 0x94A3B8);
        this.criarEstrelas(80, 2, 0.5, 0xCBD5E1);
        this.criarEstrelas(40, 3, 1, 0xFFFFFF);

        const cores = [0xEF4444, 0x3B82F6, 0xFACC15, 0xA855F7];

        for (let i = 0; i < 4; i++) {
            this.add.circle(400 + i * 800, 250, 40, cores[i]);
        }

        this.texto = this.add.text(10, 10, "", {
            fontSize: "20px",
            color: "#FFFFFF"
        });

        this.texto.setScrollFactor(0);
        this.atualizarTexto();
    }

    criarEstrelas(quantidade, raio, fator, cor) {
        const largura = 800 + fator * (MUNDO_L - 800);

        for (let i = 0; i < quantidade; i++) {
            const x = Phaser.Math.Between(0, Math.floor(largura));
            const y = Phaser.Math.Between(0, 500);

            this.add.circle(x, y, raio, cor).setScrollFactor(fator, 0);
        }
    }

    atualizarTexto() {
        this.texto.setText(`Câmara: x = ${Math.round(this.cameras.main.scrollX)}`);
    }

    update(time, delta) {
        const velocidade = this.teclas.shift.isDown ? 900 : 300;
        const movimento = velocidade * (delta / 1000);

        if (this.teclas.esquerda.isDown) {
            this.cameras.main.scrollX -= movimento;
        }

        if (this.teclas.direita.isDown) {
            this.cameras.main.scrollX += movimento;
        }

        this.atualizarTexto();
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#0F172A",
    scene: ParalaxeScene
};

const game = new Phaser.Game(config);