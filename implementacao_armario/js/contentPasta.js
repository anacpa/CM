
// ===================================================== premios
// Array de imagens 
const img_edit = [
    'pasta/sticker.svg',  // 0 a 9
    'pasta/poster.jpeg',  // 10 a 19
    'pasta/sticker.svg',  // 20 a 29
    'pasta/sticker.svg',  // 30 a 39
    'pasta/sticker.svg',  // 40 a 49
    'pasta/sticker.svg',  // 50 a 59
    'pasta/sticker.svg'   // 60+
];

// função que retorna todas as imagens até o nível atual de pontos
function sistemaPontos(pontos) {
    const imagensParaMostrar = [];

    // cada imagem representa um intervalo de 10 pontos
    let indexMax = Math.floor(pontos / 10);

    // garantir que não ultrapassamos o número de imagens
    indexMax = Math.min(indexMax, img_edit.length - 1);

    for (let i = 0; i <= indexMax; i++) {
        imagensParaMostrar.push(img_edit[i]);
    }

    return imagensParaMostrar;
}

document.addEventListener('DOMContentLoaded', () => {
    const pontos = 23;
    const imagensSelecionadas = sistemaPontos(pontos);
    const edit_container = document.getElementById('editoriais');

    imagensSelecionadas.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'escala de pontos';

        // Adiciona evento de clique para download
        img.addEventListener('click', () => {
            const confirmar = confirm('Quer guardar esta imagem?');

            if (confirmar) {
                const link = document.createElement('a');
                link.href = src;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });


        edit_container.appendChild(img);
    });
});
