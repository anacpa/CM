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

// define qual e a imagem consoante os pontos
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
        return img_escala[5]; //50 a 59
    } else {
        return img_escala[6]; // 60++
    }
}

// simulacao
let pontos = 45; 

// define qual e a imagem consoante os pontos atuais (simulacao)
const imagemSelecionada = sistemaPontos(pontos);

// exibe imagem
const escala_container = document.getElementById('escala_pontos');
const img = document.createElement('img');
img.src = imagemSelecionada;
img.alt = 'escala de pontos'; // Adicione uma descrição acessível aqui
escala_container.appendChild(img);



// =================================== .