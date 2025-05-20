// =================================== coluna (array)

// Array de imagens da coluna
const img_escala = [
    'imagens/coluna/1.svg',
    'imagens/coluna/2.svg',
    'imagens/coluna/3.svg',
    'imagens/coluna/4.svg',
    'imagens/coluna/5.svg',
    'imagens/coluna/6.svg',
    'imagens/coluna/7.svg',
    'imagens/coluna/8.svg'
];

// Função que define qual imagem mostrar consoante os pontos
function sistemaPontos(pontos) {
    if (pontos >= 0 && pontos < 10) {
        return img_escala[0]; // 0 a 9
    } else if (pontos >= 10 && pontos < 20) {
        return img_escala[1]; // 10 a 19
    } else if (pontos >= 20 && pontos < 30) {
        return img_escala[2]; // 20 a 29
    } else if (pontos >= 30 && pontos < 40) {
        return img_escala[3]; // 30 a 39
    } else if (pontos >= 40 && pontos < 50) {
        return img_escala[4]; // 40 a 49
    } else if (pontos >= 50 && pontos < 60) {
        return img_escala[5]; // 50 a 59
    } else if (pontos >= 60 && pontos < 70) {
        return img_escala[6]; // 60 a 69
    } else {
        return img_escala[7]; // 70++
    }
}

// ===============================
// Buscar a pontuação guardada pelo pontuacao.js

let pontos = parseInt(localStorage.getItem("pontuacaoAtual")) || 0;

// Mostrar no console para debug (podes remover se quiseres)
console.log("Pontuação atual:", pontos);

// ===============================
// Definir qual imagem mostrar consoante os pontos atuais

const imagemSelecionada = sistemaPontos(pontos);

// ===============================
// Exibir a imagem na página

const escala_container = document.getElementById('escala_pontos');

if (escala_container) {
    const img = document.createElement('img');
    img.src = imagemSelecionada;
    img.alt = 'Escala de pontos';
    escala_container.appendChild(img);
} else {
    console.warn("Elemento 'escala_pontos' não encontrado na página.");
}
