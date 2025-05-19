let mic;
let pontuacao = 0;

function setup() {
    let canvas = createCanvas(400, 300);
    canvas.parent('jogo'); // Insere o canvas dentro da div #jogo
    mic = new p5.AudioIn();
    mic.start();
    textAlign(CENTER, CENTER);
    textSize(24);
}

function draw() {
    clear();

    let volume = mic.getLevel(); // Valor entre 0.0 e ~1.0
    let pontos = map(volume, 0, 1, 0, 100);
    pontos = constrain(pontos, 0, 100);

    if (volume > 0.05) {
        pontuacao += int(pontos);
    }

    fill(255);
    text("Volume: " + nf(volume, 0, 3), width / 2, height / 3);
    text("Pontuação: " + pontuacao, width / 2, height / 2);

    fill(200, 0, 0);
    rect(50, height - 50, volume * 300, 20);
}
