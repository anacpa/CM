let mic;
let pontuacao = 0;
let portasPassadas = 0;
let tempoTotal = 60000; // 1 minuto em milissegundos
let tempoInicio;
let jogoTerminado = false;
let gritoAtivo = false;

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
    volumeSuavizado = lerp(volumeSuavizado, volume, 0.05);

    // Mapeia volume suavizado para escala de 0 a 1000
    let pontos = map(volumeSuavizado, 0.01, 1, 0, 1000);
    pontos = constrain(pontos, 0, 1000);

    // Aumenta pontuação devagar com limite
    if (volumeSuavizado > 0.05 && pontuacao < 1000) {
        pontuacao += 1;
        pontuacao = constrain(pontuacao, 0, 1000);
    }

    // Barra de progresso
    fill(255);
    text("POINTS", 90, height / 4 * 3);

    fill(200, 0, 0);
    noStroke();
    let larguraBarra = map(pontuacao, 0, 1000, 0, 150);
    rect(width / 4, height - 25, larguraBarra, 25);

    fill(0);
    textAlign(CENTER);
    text(pontuacao, 85, height - 10);

    // Temporizador
    let tempoRestante = max(0, tempoTotal - (millis() - tempoInicio));
    let minutos = floor(tempoRestante / 60000);
    let segundos = floor((tempoRestante % 60000) / 1000);
    let timerTexto = nf(minutos, 2) + ':' + nf(segundos, 2);
    document.getElementById("temporizador").innerText = timerTexto;

    // DIFICULDADE PROGRESSIVA
    let tempoDecorrido = millis() - tempoInicio;
    let dificuldadeProporcional = map(tempoDecorrido, 0, tempoTotal, 0.05, 0.15);
    let limitePassagem = constrain(dificuldadeProporcional, 0.05, 0.2);

        // LÓGICA FINAL DO JOGO
if (!jogoTerminado && pontuacao === 500) {
    jogoTerminado = true;
    localStorage.setItem('nivel3Desbloqueado', true);
    alert("Parabéns! Atingiste a pontuação máxima! Pronto para o próximo nível?");
    window.location.href = "3.html";
} else if (!jogoTerminado && millis() - tempoInicio >= tempoTotal) {
    jogoTerminado = true;
    if (portasPassadas >= 3) {
        // verifica se a pontuação é suficiente para desbloquear o nível 3
        localStorage.setItem('nivel3Desbloqueado', true);
        alert("Parabéns! Passaste para o nível seguinte!");
        window.location.href = "3.html";
    } else {
        alert("Tenta de novo! Não passaste portas suficientes.");
         location.reload();
    }

} else if (!jogoTerminado) {
    if (volumeSuavizado > limitePassagem) {
        gritoAtivo = true;
    } else if (gritoAtivo && volumeSuavizado <= limitePassagem) {
        tentarPassarPorta();
        gritoAtivo = false;
    }
}

}

let doors = ['open/1.svg', 'open/2.svg', 'open/3.svg','open/5.svg', 'open/6.svg', 'open/7.svg', 'open/8.svg', 'open/9.svg', 'open/4.svg'];
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
    portaImg.style.bottom = '17.5%';
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


