//Arrays que inicializam as imagens.

let doors = ['portas/1.gif', 'portas/2.gif', 'portas/3.gif'];
let person = ['personagens/1.png', 'personagens/3.png', 'personagens/4.png'];


//ARRAY DAS CRIANÇAS
for (let i=0; i<1; i++){
    let p = person[Math.floor(Math.random()*person.length)]; //EX: Math.floor (0,48 * 12 = 5,76) = 6 (imagem 6)

    //para este elemento escolhido vamos criar um elemento html.

    let img = document.createElement("img");
    img.src = p; //vai buscar a imagem escolhida pelo ciclo for, que vai buscar a imagem correspondente no array, onde esta já está definida pelo seu url.
    img.className = 'child';

    //posicionar imagem na página com css.
    img.style.position = 'fixed';
    img.style.left = '45%';
    img.style.bottom = '23.5%';
    img.style.width= '10%';
    img.style.height='42%';

    //adicionar o elemento ao body.
    document.querySelector('main').appendChild(img);
}

//Fazer um ciclo for() que percorra este array e selecione uma imagem ao calhas.
for (let i=0; i<1; i++){
    let door = doors[Math.floor(Math.random()*doors.length)]; //EX: Math.floor (0,48 * 12 = 5,76) = 6 (imagem 6)

    //para este elemento escolhido vamos criar um elemento html.

    let img = document.createElement("img");
    img.src = door; //vai buscar a imagem escolhida pelo ciclo for, que vai buscar a imagem correspondente no array, onde esta já está definida pelo seu url.
    img.className = 'portaV1';

    //posicionar imagem na página com css.
    img.style.position = 'fixed';
    img.style.left = '29.5%';
    img.style.bottom = '10%';
    img.style.width= '30%';
    img.style.height='75%';

    //adicionar o elemento ao body.
    document.querySelector('main').appendChild(img);
}