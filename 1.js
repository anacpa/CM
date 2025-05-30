let mic;
let pontuacao = 0;
let portasPassadas = 0;
let tempoTotal = 90000; // 1 minuto e 30 segundos em milissegundos
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

let volumeSuavizado = 0;

function draw() {
    clear();

    let volume = mic.getLevel();

    // Suavização do volume (filtro exponencial)
    volumeSuavizado = lerp(volumeSuavizado, volume, 0.1); // quanto menor, mais suave

    // DEBUG opcional:
    fill(255);
    textAlign(LEFT);
    textSize(14);
    text("Volume: " + nf(volumeSuavizado, 1, 4), 10, 20);

    // Escala ajustada para 0 a 500
    let pontos = map(volumeSuavizado, 0.01, 0.15, 0, 500);
    pontos = constrain(pontos, 0, 500);

    if (volumeSuavizado > 0.05 && pontuacao < 500) {
        pontuacao += int(pontos * 0.01); // aumentar devagar
        pontuacao = constrain(pontuacao, 0, 500);
    }

    // Medidor visual
    fill(200, 0, 0);
    noStroke();
    let larguraBarra = map(pontuacao, 0, 500, 0, 150); // compatível com pontuação
    rect(width / 4, height - 25, larguraBarra, 25);

    fill(255);
    textAlign(CENTER);
    textSize(18);
    text("PONTOS", 90, height / 4 * 3);
    text(pontuacao, 85, height - 10);

    // Temporizador
    let tempoRestante = max(0, tempoTotal - (millis() - tempoInicio));
    let minutos = floor(tempoRestante / 60000);
    let segundos = floor((tempoRestante % 60000) / 1000);
    let timerTexto = nf(minutos, 2) + ':' + nf(segundos, 2);
    document.getElementById("temporizador").innerText = timerTexto;

    if (!jogoTerminado && millis() - tempoInicio >= tempoTotal) {
        jogoTerminado = true;
        if (portasPassadas >= 3) {
            alert("Parabéns! Passaste para o nível seguinte!");
        } else {
            alert("Tenta de novo! Não passaste portas suficientes.");
        }
    } else if (!jogoTerminado) {
        if (volume > volumeMinimoParaPassar) {
            gritoAtivo = true;
        } else if (gritoAtivo && volume <= volumeMinimoParaPassar) {
            tentarPassarPorta();
            gritoAtivo = false;
        }
    }
}


let doors = ['open/1.svg', 'open/2.svg', 'open/3.svg','open/5.svg', 'open/6.svg', 'open/7.svg','open/8.svg', 'open/9.svg', 'open/4.svg'];
let person = ['personagens/1.png', 'personagens/3.png', 'personagens/4.png'];
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