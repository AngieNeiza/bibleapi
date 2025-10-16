function Informativa() {
    document.getElementById("root").innerHTML = `<section class="info">
        <h1><a href="https://bible-api.com/">BIBLE API</a></h1>
        <h2>Tu nombre</h2>
        <img src="https://cdn-icons-png.flaticon.com/512/3771/3771429.png" alt="Bible Icon">
        <p>API con información de la Biblia completa</p>
        <p>Incluye todos los libros del Antiguo y Nuevo Testamento</p>
        <p>Total de capítulos disponibles: ${totalCapitulos}</p>
    </section>`;
}