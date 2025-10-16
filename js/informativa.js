function Informativa() {
    document.getElementById("root").innerHTML = `<section class="info">
        <h1><a href="https://bible-api.com/">BIBLE API</a></h1>
        <h2>angie neiza</h2>
        <img src="https://static.wixstatic.com/media/b78a8a_dfd382dea45f4b9f851cb1af65dd817f~mv2.png/v1/fill/w_1000,h_563,al_c,q_90,usm_0.66_1.00_0.01/b78a8a_dfd382dea45f4b9f851cb1af65dd817f~mv2.png" alt="Bible Icon">
        <p>API con información de la Biblia completa</p>
        <p>Incluye todos los libros del Antiguo y Nuevo Testamento</p>
        <p>Total de capítulos disponibles: ${totalCapitulos}</p>
    </section>`;
}