function Favoritos() {
    document.body.className = "";
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    
    if (favoritos.length === 0) {
        document.getElementById("root").innerHTML = "<p>No hay favoritos</p>";
    } else {
        let listaHTML = "";
        for (let i = 0; i < favoritos.length; i++) {
            listaHTML += `<div class="c-lista-capitulo" onclick="Versiculo('${favoritos[i].libro}', ${favoritos[i].capitulo})">
                <p>${favoritos[i].referencia}</p>
                <p>${favoritos[i].libro}</p>
                <p>Capítulo ${favoritos[i].capitulo}</p>
            </div>`;
        }
        document.getElementById("root").innerHTML = listaHTML;
    }
}