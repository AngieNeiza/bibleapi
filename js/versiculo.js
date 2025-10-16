var esFavorito = false;

// Función para agregar o quitar un capítulo de favoritos
function toggleFavorito(libro, capitulo) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let existe = false;
    let referencia = `${libro} ${capitulo}`;

    for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].referencia === referencia) {
            existe = true;
            break;
        }
    }

    if (existe === true) {
        favoritos = favoritos.filter(cap => cap.referencia !== referencia);
        esFavorito = false;
    } else {
        favoritos.push({
            libro: libro,
            capitulo: capitulo,
            referencia: referencia
        });
        esFavorito = true;
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    const boton = document.querySelector(`#corazon-${libro}-${capitulo}`);
    if (boton) boton.textContent = esFavorito ? "❤️" : "🤍";
}

async function Versiculo(libro, capitulo) {
    try {
        const res = await fetch(`https://bible-api.com/${libro}%20${capitulo}?translation=bbe`);
        const data = await res.json();
        var root = document.getElementById("root");

        favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        let referencia = `${libro} ${capitulo}`;
        esFavorito = favoritos.some(cap => cap.referencia === referencia);

        // Generar versículos
        let versiculosHTML = "";
        for (let i = 0; i < data.verses.length; i++) {
            versiculosHTML += `<p><strong>${data.verses[i].verse}:</strong> ${data.verses[i].text}</p>`;
        }

        document.body.className = libro.toLowerCase();

        root.innerHTML = `<section class="c-detalle">
            <h1>${data.reference}</h1>
            <p><strong>Libro:</strong> ${libro}</p>
            <p><strong>Capítulo:</strong> ${capitulo}</p>
            <p><strong>Versículos:</strong> ${data.verses.length}</p>
            <div class="versiculos-container">
                ${versiculosHTML}
            </div>
            <button onClick="toggleFavorito('${libro}', ${capitulo})">
                <span id="corazon-${libro}-${capitulo}">${esFavorito ? '❤️' : '🤍'}</span>
                Favorito
            </button>
        </section>`;
    } catch (error) {
        document.getElementById("root").innerHTML = `<p>Error al cargar el capítulo</p>`;
    }
}