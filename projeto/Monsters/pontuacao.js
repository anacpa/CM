let mic;
let pontuacao = 0;

function setup() {
    let canvas = createCanvas(150, 300);
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
        // Atualizar o localStorage sempre que a pontuação muda
        localStorage.setItem("pontuacaoAtual", pontuacao);
    }

    fill(255);
<<<<<<< HEAD
    text("POINTS", 90, height/4*3);

    fill(200, 0, 0);
    noStroke();
    rect(width/4, height-25, volume * 300, 25);

    fill(0);
    textAlign(CENTER);
    text(pontuacao, 85, height-10);
=======
    text("POINTS", 90, height / 4 * 3);

    fill(200, 0, 0);
    noStroke();
    rect(width / 4, height - 25, volume * 300, 25);

    fill(0);
    textAlign(CENTER);
    text(pontuacao, 85, height - 10);
>>>>>>> 7a12fd6c13fe51aa507970ac87b86540a67040b1
}

