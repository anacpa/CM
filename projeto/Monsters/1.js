let mic;
let pontuacao = 0;
let portasPassadas = 0;
let tempoTotal = 180000; // 3 minutos em milissegundos
let tempoInicio;
let jogoTerminado = false;
let volumeMinimoParaPassar = 0.05;
let gritoAtivo = false; // novo estado para controlar o grito

function millis() {
    return new Date().getTime();
}

function setup() {
    let canvas = createCanvas(150, 300);
    canvas.parent('jogo');
    mic = new p5.AudioIn();
    mic.start();
    textAlign(CENTER, CENTER);
    textSize(24);
    tempoInicio = millis();
    novaPorta();
}

function draw() {
    clear();

    let volume = mic.getLevel();
    let pontos = map(volume, 0, 1, 0, 100);
    pontos = constrain(pontos, 0, 100);

    if (volume > 0.05) {
        pontuacao += int(pontos);
    }

    fill(255);
    text("POINTS", 90, height / 4 * 3);

    fill(200, 0, 0);
    noStroke();
    rect(width / 4, height - 25, volume * 300, 25);

    fill(0);
    textAlign(CENTER);
    text(pontuacao, 85, height - 10);

    let tempoRestante = max(0, tempoTotal - (millis() - tempoInicio));
    let minutos = floor(tempoRestante / 60000);
    let segundos = floor((tempoRestante % 60000) / 1000);
    let timerTexto = nf(minutos, 2) + ':' + nf(segundos, 2);
    document.getElementById("temporizador").innerText = timerTexto;

    if (!jogoTerminado && millis() - tempoInicio >= tempoTotal) {
        jogoTerminado = true;
        if (portasPassadas >= 3) {
            alert("Parabéns! Passaste para o nível seguinte!");
            // window.location.href = "nivel2.html";
        } else {
            alert("Tenta de novo! Não passaste portas suficientes.");
        }
    } else if (!jogoTerminado) {
        // Novo comportamento: só avança quando o jogador deixa de gritar
        if (volume > volumeMinimoParaPassar) {
            gritoAtivo = true;
        } else if (gritoAtivo && volume <= volumeMinimoParaPassar) {
            tentarPassarPorta();
            gritoAtivo = false;
        }
    }
}

let doors = ['/portas/1.gif', '/portas/2.gif', '/portas/3.gif'];
let person = ['/personagens/1.png', '/personagens/3.png', '/personagens/4.png'];
let currentDoorImg, currentPersonImg;

function novaPorta() {
    if (currentDoorImg) currentDoorImg.remove();
    if (currentPersonImg) currentPersonImg.remove();

    let portaSrc = doors[Math.floor(Math.random() * doors.length)];
    let pessoaSrc = person[Math.floor(Math.random() * person.length)];

    let portaImg = document.createElement("img");
    portaImg.src = portaSrc;
    portaImg.className = 'portaV1';
    portaImg.style.position = 'fixed';
    portaImg.style.left = '29.5%';
    portaImg.style.bottom = '10%';
    portaImg.style.width = '30%';
    portaImg.style.height = '75%';
    document.querySelector('main').appendChild(portaImg);
    currentDoorImg = portaImg;

    let pessoaImg = document.createElement("img");
    pessoaImg.src = pessoaSrc;
    pessoaImg.className = 'child';
    pessoaImg.style.position = 'fixed';
    pessoaImg.style.left = '45%';
    pessoaImg.style.bottom = '23.5%';
    pessoaImg.style.width = '10%';
    pessoaImg.style.height = '42%';
    document.querySelector('main').appendChild(pessoaImg);
    currentPersonImg = pessoaImg;
}

function tentarPassarPorta() {
    portasPassadas++;
    novaPorta();
}