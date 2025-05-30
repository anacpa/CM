window.addEventListener('load', () => {
    const openRegras = document.getElementById('botaoQuestion');
    const contentRegras = document.getElementById('contentRegras');
    const closeRegras = document.getElementById('botaoRegrasClose');

    // Abrir
    openRegras.addEventListener('click', () => {
        contentRegras.classList.add('show');
    });

    // Fechar
    closeRegras.addEventListener('click', () => {
        contentRegras.classList.remove('show');
    });
});


// por alguma razao nao estava a funcionar, entao pus no html mesmo