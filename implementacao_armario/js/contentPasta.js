
// ===================================================== premios


// Array de imagens 
const img_edit = [
    'pasta/sticker.svg',
    'pasta/poster.jpeg',
    'pasta/3.svg',
    'pasta/4.svg',
    'pasta/5.svg',
    'pasta/6.svg',
    'pasta/7.svg',
    'pasta/8.svg'
];

// define qual e a imagem consoante os pontos
function sistemaPontos(pontos) {

    if (pontos >= 0 && pontos < 10) {
        return img_edit[0]; // 0 a 9
    } else if (pontos >= 10 && pontos < 20) {
        return img_edit[1]; // 10 a 19
    } else if (pontos >= 20 && pontos < 30) {
        return img_edit[2]; // 20 a 29
    } else if (pontos >= 30 && pontos < 40) {
        return img_edit[3]; // 30 a 39
    } else if (pontos >= 40 && pontos < 50) {
        return img_edit[4]; // 40 a 49
    } else if (pontos >= 50 && pontos < 60) {
        return img_edit[5]; //50 a 59
    } else {
        return img_edit[6]; // 60++
    }
}

// simulacao
let pontos = 5;

// define qual e a imagem consoante os pontos atuais (simulacao)
const imagemSelecionada = sistemaPontos(pontos);

// exibe imagem
const edit_container = document.getElementById('editoriais');
const img = document.createElement('img');
img.src = imagemSelecionada;
img.alt = 'escala de pontos'; // Adicione uma descrição acessível aqui
edit_container.appendChild(img);

