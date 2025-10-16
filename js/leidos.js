var misCapitulos = JSON.parse(localStorage.getItem("misCapitulos")) || [];

async function Aleatorios() {
    document.getElementById("nuevos").innerHTML = "";
    let capsAleatorios = "";
    
    // Asegurar que los capítulos estén cargados
    if (capitulos.length === 0) {
        generarListaCapitulos();
        capitulos = await Conexion("All");
    }
    
    for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * capitulos.length);
        let capAleatorio = capitulos[randomIndex];
        
        capsAleatorios += `<div class="c-lista-capitulo c-un_aleatorio">
            <p>#${capAleatorio.id}</p>
            <p>${capAleatorio.libro}</p>
            <p>Capítulo ${capAleatorio.capitulo}</p>
        </div>`;
        
        misCapitulos = JSON.parse(localStorage.getItem("misCapitulos")) || [];
        let existe = false;
        
        for (let j = 0; j < misCapitulos.length; j++) {
            if (misCapitulos[j] === capAleatorio.id) {
                existe = true;
                break;
            }
        }
        
        if (!existe) {
            misCapitulos.push(capAleatorio.id);
            localStorage.setItem("misCapitulos", JSON.stringify(misCapitulos));
            
            const elemento = document.getElementById("c-uncap-" + capAleatorio.id);
            if (elemento) {
                elemento.innerHTML = `<div onclick="Versiculo('${capAleatorio.libro}', ${capAleatorio.capitulo})">
                    <p>${capAleatorio.libro}</p>
                    <p>${capAleatorio.capitulo}</p>
                </div>`;
                elemento.classList.add("c-mios-capitulo");
            }
        }
    }
    
    document.getElementById("nuevos").innerHTML += capsAleatorios;
    document.getElementById("contador").innerHTML = `${misCapitulos.length} / ${totalCapitulos}`;
}

async function Leidos() {
    document.body.className = "";
    document.getElementById("root").innerHTML = "";
    
    // Asegurar que los capítulos estén cargados
    if (capitulos.length === 0) {
        generarListaCapitulos();
        capitulos = await Conexion("All");
    }
    
    // Crear sección de aleatorios
    const capturaAleatoria = document.createElement("section");
    capturaAleatoria.classList.add("c-lista");
    capturaAleatoria.id = "nuevos";
    
    // Crear botón de aleatorios
    const boton = document.createElement("button");
    boton.textContent = "4 nuevos capítulos";
    boton.addEventListener("click", () => {
        Aleatorios();
    });
    
    // Crear álbum de capítulos
    const seccionLeidos = document.createElement("section");
    seccionLeidos.classList.add("c-lista");
    let misCaps = "";
    
    for (let i = 0; i < capitulos.length; i++) {
        let cap = capitulos[i];
        if (misCapitulos.includes(cap.id)) {
            misCaps += `<div class="c-uncap c-mios-capitulo cap-${cap.id}" onclick="Versiculo('${cap.libro}', ${cap.capitulo})">
                <p>${cap.libro}</p>
                <p>${cap.capitulo}</p>
            </div>`;
        } else {
            misCaps += `<div class="c-uncap" id="c-uncap-${cap.id}">
                <p>${cap.id}</p>
            </div>`;
        }
    }
    
    seccionLeidos.innerHTML = misCaps;
    
    // Contador
    let contador = document.createElement("p");
    contador.textContent = `${misCapitulos.length} / ${totalCapitulos}`;
    contador.id = "contador";
    
    // Añadir elementos al DOM
    document.getElementById("root").appendChild(contador);
    document.getElementById("root").appendChild(boton);
    document.getElementById("root").appendChild(capturaAleatoria);
    document.getElementById("root").appendChild(seccionLeidos);
}