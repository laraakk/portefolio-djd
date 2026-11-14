const CEL = 64;
const COLS = 10;
const LINHAS = 7;

class RoboScene extends Phaser.Scene {
    create() {
        this.inicioX = (800 - COLS * CEL) / 2;
        this.inicioY = 72;

        this.col = 0;
        this.lin = 0;
        this.movimentos = 0;
        this.estrelas = 0;

        const grafismo = this.add.graphics();
        grafismo.lineStyle(2, 0x94A3B8);

        for (let linha = 0; linha < LINHAS; linha++) {
            for (let coluna = 0; coluna < COLS; coluna++) {
                grafismo.strokeRect(
                    this.inicioX + coluna * CEL,
                    this.inicioY + linha * CEL,
                    CEL,
                    CEL
                );
            }
        }

        const posicao = this.centroDe(this.col, this.lin);

        this.robo = this.add.rectangle(posicao.x, posicao.y, 48, 48, 0x22C55E);

        this.criarEstrela();

        this.cursors = this.input.keyboard.createCursorKeys();

        this.texto = this.add.text(10, 15, "", {
            fontSize: "20px",
            color: "#FFFFFF"
        });

        this.atualizarTexto();
    }

    centroDe(col, lin) {
        return {
            x: this.inicioX + col * CEL + CEL / 2,
            y: this.inicioY + lin * CEL + CEL / 2
        };
    }

    criarEstrela() {
        let novaCol;
        let novaLin;

        do {
            novaCol = Phaser.Math.Between(0, COLS - 1);
            novaLin = Phaser.Math.Between(0, LINHAS - 1);
        } while (novaCol === this.col && novaLin === this.lin);

        const posicao = this.centroDe(novaCol, novaLin);

        if (this.estrela) {
            this.estrela.destroy();
        }

        this.estrela = this.add.circle(posicao.x, posicao.y, 16, 0xFACC15);

        this.estrelaCol = novaCol;
        this.estrelaLin = novaLin;
    }

    atualizarTexto() {
        this.texto.setText(`Movimentos: ${this.movimentos} · Estrelas: ${this.estrelas}`);
    }

    update() {
        let novaCol = this.col;
        let novaLin = this.lin;

        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            novaCol--;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            novaCol++;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            novaLin--;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            novaLin++;
        }

        novaCol = Phaser.Math.Clamp(novaCol, 0, COLS - 1);
        novaLin = Phaser.Math.Clamp(novaLin, 0, LINHAS - 1);

        if (novaCol !== this.col || novaLin !== this.lin) {
            this.col = novaCol;
            this.lin = novaLin;
            this.movimentos++;

            const posicao = this.centroDe(this.col, this.lin);
            this.robo.setPosition(posicao.x, posicao.y);

            if (this.col === this.estrelaCol && this.lin === this.estrelaLin) {
                this.estrelas++;
                this.criarEstrela();
            }

            this.atualizarTexto();
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 540,
    backgroundColor: "#0F172A",
    scene: RoboScene
};

const game = new Phaser.Game(config);