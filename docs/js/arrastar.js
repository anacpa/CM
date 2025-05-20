function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    element.style.cursor = "grab";
    element.style.position = "absolute";
    element.style.transition = "transform 0.3s ease, left 0.2s ease, top 0.2s ease";
    element.style.width = '120px';

    element.addEventListener("mousedown", function (e) {
        isDragging = true;
        element.style.cursor = "grabbing";
        e.preventDefault();
        const areaRect = element.parentElement.getBoundingClientRect();
        offsetX = e.clientX - areaRect.left - element.offsetLeft;
        offsetY = e.clientY - areaRect.top - element.offsetTop;
        element.style.zIndex = 1000;
    });

    document.addEventListener("mousemove", function (e) {
        if (isDragging) {
            const areaRect = element.parentElement.getBoundingClientRect();
            let newX = e.clientX - areaRect.left - offsetX;
            let newY = e.clientY - areaRect.top - offsetY;

            newX = Math.max(0, Math.min(newX, window.innerWidth - element.clientWidth));
            newY = Math.max(0, Math.min(newY, window.innerHeight - element.clientHeight));

            element.style.left = newX + "px";
            element.style.top = newY + "px";
        }
    });

    document.addEventListener("mouseup", function () {
        if (!isDragging) return;
        isDragging = false;
        element.style.cursor = "grab";

        // Guardar posição
        const id = element.dataset.id;
        const x = parseFloat(element.style.left);
        const y = parseFloat(element.style.top);
        localStorage.setItem(`pos-${id}`, JSON.stringify({ x, y }));
    });
}




function isOverlapping(x, y, width, height, others) {
    return others.some(pos => {
        return !(
            x + width < pos.x ||  // à esquerda
            x > pos.x + pos.width || // à direita
            y + height < pos.y || // acima
            y > pos.y + pos.height // abaixo
        );
    });
}



window.addEventListener("load", () => {
    const area = document.getElementById("area_armario");
    const elements = document.querySelectorAll('#personalizar_img .p_img img');

    const placedPositions = [];

    elements.forEach((el, index) => {
        el.style.position = "absolute";
        el.style.width = "120px";

        const id = el.dataset.id || `item-${index}`;
        el.dataset.id = id; // garante que tenha um id

        // Mover para dentro da área do armário
        area.appendChild(el);

        const savedPosition = localStorage.getItem(`pos-${id}`);
        if (savedPosition) {
            const { x, y } = JSON.parse(savedPosition);
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
        } else {
            const elWidth = el.offsetWidth;
            const elHeight = el.offsetHeight;
            const maxX = area.clientWidth - el.clientWidth;
            const maxY = area.clientHeight - el.clientHeight;

            let tries = 0;
            let randX, randY;

            do {
                randX = Math.random() * (maxX / 3) + (maxX * 2/3); // metade direita
                randY = Math.random() * maxY;
                tries++;
            } while (isOverlapping(randX, randY, elWidth, elHeight, placedPositions) && tries < 100);

            el.style.left = `${randX}px`;
            el.style.top = `${randY}px`;

            placedPositions.push({ x: randX, y: randY, width: elWidth, height: elHeight });
        }

        makeDraggable(el);
    });
});


/*

// ver dados json, colar na consola 

Object.keys(localStorage)
  .filter(key => key.startsWith("pos-"))
  .map(key => ({ id: key, ...JSON.parse(localStorage.getItem(key)) }));


*/