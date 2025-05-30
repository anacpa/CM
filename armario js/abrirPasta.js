window.addEventListener('load', () => {
    const openPasta = document.getElementById('botao_pasta');
    const contentPasta = document.getElementById('contentGeral_pasta');
    const closePasta = document.getElementById('fechar_pasta');

    // abrir
    openPasta.addEventListener('click', () => {
        contentPasta.classList.add('content_pasta');
    });

    // fechar
    closePasta.addEventListener('click', () => {
        contentPasta.classList.remove('content_pasta');
    });
});

