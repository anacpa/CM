//Arrays que inicializam as imagens.

let doors = ['/portas/1.svg', '/portas/2.svg', '/portas/3.svg', '/portas/4.svg', '/portas/5.svg', '/portas/6.svg',
    '/portas/7.svg', '/portas/8.svg', '/portas/9.svg', '/portas/10.svg', '/portas/11.svg', '/portas/12.svg'];

let open = ['/open/1.svg', '/open/2.svg', '/open/3.svg', '/open/4.svg', '/open/5.svg', '/open/6.svg',
    '/open/7.svg', '/open/8.svg', '/open/9.svg', '/open/10.svg', '/open/11.svg', '/open/12.svg'];


//Fazer um ciclo for() que percorra este array e selecione uma imagem ao calhas.

for (let i=0; i<1; i++){
    let door = doors[Math.floor(Math.random()*doors.length)]; //EX: Math.floor (0,48 * 12 = 5,76) = 6 (imagem 6)

    //para este elemento escolhido vamos criar um elemento html.

    let img = document.createElement("img");
    img.src = door; //vai buscar a imagem escolhida pelo ciclo for, que vai buscar a imagem correspondente no array, onde esta já está definida pelo seu url.
    img.className = 'portaV1';

    //posicionar imagem na página com css.
    img.style.position = 'fixed';
    img.style.left = '35%';
    img.style.bottom = '23.5%';
    img.style.width= '30%';
    img.style.height='60%';

    //adicionar o elemento ao body.
    document.querySelector('main').appendChild(img);
}