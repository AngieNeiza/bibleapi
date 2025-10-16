function generarLista(arrayCapitulos) {
    let listaHTML = "";
    for (let i = 0; i < arrayCapitulos.length; i++) {
        listaHTML += `<div class="c-lista-capitulo cap-${arrayCapitulos[i].id}" onclick="Versiculo('${arrayCapitulos[i].libro}', ${arrayCapitulos[i].capitulo})">
            <p>#${arrayCapitulos[i].id}</p>
            <p>${arrayCapitulos[i].libro}</p>
            <p>Capítulo ${arrayCapitulos[i].capitulo}</p>
        </div>`;
    }
    return listaHTML;
}

function buscadorfuncion(busqueda) {
    if (busqueda.length >= 3) {
        const filtrados = [];
        for (let i = 0; i < capitulos.length; i++) {
            const libro = capitulos[i].libro.toLowerCase();
            const referencia = capitulos[i].referencia.toLowerCase();
            if (libro.includes(busqueda.toLowerCase()) || referencia.includes(busqueda.toLowerCase())) {
                filtrados.push(capitulos[i]);
            }
        }
        let listaHTML = generarLista(filtrados);
        document.getElementById("la-lista").innerHTML = listaHTML;
    } else {
        let listaHTML = generarLista(capitulos);
        document.getElementById("la-lista").innerHTML = listaHTML;
    }
}

function Home() {
    document.body.className = "";
    var root = document.getElementById("root");
    root.innerHTML = "";

    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar libro o capítulo...";
    buscador.addEventListener("input", () => {
        buscadorfuncion(buscador.value);
    });

    // Contenedor de filtros por libro
    const tiposLibros = [
        "genesis", "exodus", "leviticus", "numbers", "deuteronomy",
        "joshua", "judges", "ruth", "1samuel", "2samuel",
        "psalms", "proverbs", "isaiah", "jeremiah", "daniel",
        "matthew", "mark", "luke", "john", "acts",
        "romans", "1corinthians", "ephesians", "revelation"
    ];

    const contenedorFiltro = document.createElement("section");
    contenedorFiltro.classList.add("tipos-container");
    
    for (let i = 0; i < tiposLibros.length; i++) {
        const btn = document.createElement("button");
        btn.textContent = tiposLibros[i];
        btn.addEventListener("click", () => {
            FiltroConexion(tiposLibros[i]);
        });
        contenedorFiltro.appendChild(btn);
    }

    const listaHTML = generarLista(capitulos);
    var contenedorCapitulos = document.createElement("section");
    contenedorCapitulos.id = "la-lista";
    contenedorCapitulos.innerHTML = listaHTML;

    document.getElementById("root").appendChild(buscador);
    document.getElementById("root").appendChild(contenedorFiltro);
    document.getElementById("root").appendChild(contenedorCapitulos);
}