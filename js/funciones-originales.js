// FUNCIÓN ORIGINAL 1: Estadísticas del Usuario
function EstadisticasUsuario() {
    document.body.className = "";
    document.getElementById("root").innerHTML = "";
    
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let misCapitulos = JSON.parse(localStorage.getItem("misCapitulos")) || [];
    
    // Calcular estadísticas por libro
    let estadisticasPorLibro = {};
    
    for (let i = 0; i < misCapitulos.length; i++) {
        let capId = misCapitulos[i];
        let capInfo = capitulos.find(cap => cap.id === capId);
        if (capInfo) {
            if (!estadisticasPorLibro[capInfo.libro]) {
                estadisticasPorLibro[capInfo.libro] = {
                    leidos: 0,
                    total: libros.find(lib => lib.name === capInfo.libro)?.chapters || 0
                };
            }
            estadisticasPorLibro[capInfo.libro].leidos++;
        }
    }
    
    // Calcular porcentaje total
    let porcentajeTotal = ((misCapitulos.length / totalCapitulos) * 100).toFixed(2);
    
    // Libro más leído
    let libroMasLeido = { nombre: "Ninguno", cantidad: 0 };
    for (let libro in estadisticasPorLibro) {
        if (estadisticasPorLibro[libro].leidos > libroMasLeido.cantidad) {
            libroMasLeido = { nombre: libro, cantidad: estadisticasPorLibro[libro].leidos };
        }
    }
    
    // Generar HTML de estadísticas por libro
    let listaEstadisticas = "";
    for (let libro in estadisticasPorLibro) {
        let porcentaje = ((estadisticasPorLibro[libro].leidos / estadisticasPorLibro[libro].total) * 100).toFixed(1);
        listaEstadisticas += `
            <div class="stat-libro">
                <h3>${libro}</h3>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${porcentaje}%"></div>
                </div>
                <p>${estadisticasPorLibro[libro].leidos} / ${estadisticasPorLibro[libro].total} capítulos (${porcentaje}%)</p>
            </div>
        `;
    }
    
    document.getElementById("root").innerHTML = `
        <section class="estadisticas-container">
            <h1>📊 Mis Estadísticas</h1>
            
            <div class="stats-principales">
                <div class="stat-card">
                    <h2>${misCapitulos.length}</h2>
                    <p>Capítulos Leídos</p>
                </div>
                <div class="stat-card">
                    <h2>${favoritos.length}</h2>
                    <p>Favoritos</p>
                </div>
                <div class="stat-card">
                    <h2>${porcentajeTotal}%</h2>
                    <p>Progreso Total</p>
                </div>
                <div class="stat-card">
                    <h2>${libroMasLeido.nombre}</h2>
                    <p>Libro Más Leído (${libroMasLeido.cantidad})</p>
                </div>
            </div>
            
            <h2>📚 Progreso por Libro</h2>
            <div class="libros-stats">
                ${listaEstadisticas || "<p>No has leído ningún capítulo aún</p>"}
            </div>
        </section>
    `;
}


// FUNCIÓN ORIGINAL 2: Comparador de Capítulos
function ComparadorCapitulos() {
    document.body.className = "";
    document.getElementById("root").innerHTML = "";
    
    document.getElementById("root").innerHTML = `
        <section class="comparador-container">
            <h1>🔍 Comparador de Capítulos</h1>
            <p class="descripcion">Selecciona dos capítulos para comparar su contenido, número de versículos y longitud</p>
            
            <div class="selectores-container">
                <div class="selector-capitulo">
                    <h3>Capítulo 1</h3>
                    <input type="text" id="libro1" placeholder="Libro (ej: genesis)" class="c-buscador">
                    <input type="number" id="cap1" placeholder="Capítulo" class="c-buscador" min="1">
                    <button onclick="cargarCapituloComparador(1)" class="btn-cargar">Cargar</button>
                    <div id="resultado1" class="resultado-comparador"></div>
                </div>
                
                <div class="selector-capitulo">
                    <h3>Capítulo 2</h3>
                    <input type="text" id="libro2" placeholder="Libro (ej: john)" class="c-buscador">
                    <input type="number" id="cap2" placeholder="Capítulo" class="c-buscador" min="1">
                    <button onclick="cargarCapituloComparador(2)" class="btn-cargar">Cargar</button>
                    <div id="resultado2" class="resultado-comparador"></div>
                </div>
            </div>
            
            <div id="comparacion-resultado" class="comparacion-final"></div>
        </section>
    `;
}

// Variable global para almacenar datos de comparación
var datosComparacion = { cap1: null, cap2: null };

async function cargarCapituloComparador(numero) {
    let libro = document.getElementById(`libro${numero}`).value.trim().toLowerCase();
    let capitulo = document.getElementById(`cap${numero}`).value;
    
    if (!libro || !capitulo) {
        alert("Por favor ingresa el libro y el capítulo");
        return;
    }
    
    try {
        const res = await fetch(`https://bible-api.com/${libro}%20${capitulo}?translation=bbe`);
        const data = await res.json();
        
        // Calcular estadísticas
        let totalPalabras = 0;
        let versiculoMasLargo = { texto: "", numero: 0, palabras: 0 };
        
        for (let i = 0; i < data.verses.length; i++) {
            let palabras = data.verses[i].text.split(' ').length;
            totalPalabras += palabras;
            
            if (palabras > versiculoMasLargo.palabras) {
                versiculoMasLargo = {
                    texto: data.verses[i].text,
                    numero: data.verses[i].verse,
                    palabras: palabras
                };
            }
        }
        
        let promedioPalabras = (totalPalabras / data.verses.length).toFixed(1);
        
        // Guardar datos
        datosComparacion[`cap${numero}`] = {
            referencia: data.reference,
            versiculos: data.verses.length,
            palabras: totalPalabras,
            promedio: promedioPalabras,
            masLargo: versiculoMasLargo
        };
        
        // Mostrar resultado
        document.getElementById(`resultado${numero}`).innerHTML = `
            <div class="info-capitulo-cargado">
                <h4>${data.reference}</h4>
                <p><strong>Versículos:</strong> ${data.verses.length}</p>
                <p><strong>Palabras totales:</strong> ${totalPalabras}</p>
                <p><strong>Promedio palabras/versículo:</strong> ${promedioPalabras}</p>
                <p><strong>Versículo más largo:</strong> #${versiculoMasLargo.numero} (${versiculoMasLargo.palabras} palabras)</p>
            </div>
        `;
        
        // Si ambos están cargados, mostrar comparación
        if (datosComparacion.cap1 && datosComparacion.cap2) {
            mostrarComparacion();
        }
        
    } catch (error) {
        alert("Error al cargar el capítulo. Verifica el nombre del libro y número de capítulo.");
    }
}

function mostrarComparacion() {
    let cap1 = datosComparacion.cap1;
    let cap2 = datosComparacion.cap2;
    
    let ganadorVersiculos = cap1.versiculos > cap2.versiculos ? cap1.referencia : cap2.referencia;
    let ganadorPalabras = cap1.palabras > cap2.palabras ? cap1.referencia : cap2.referencia;
    let diferenciaPalabras = Math.abs(cap1.palabras - cap2.palabras);
    let diferenciaVersiculos = Math.abs(cap1.versiculos - cap2.versiculos);
    
    document.getElementById("comparacion-resultado").innerHTML = `
        <div class="comparacion-final-content">
            <h2>⚖️ Resultado de la Comparación</h2>
            
            <div class="comparacion-grid">
                <div class="comp-item">
                    <h3>🏆 Más versículos</h3>
                    <p>${ganadorVersiculos}</p>
                    <small>Diferencia: ${diferenciaVersiculos} versículos</small>
                </div>
                
                <div class="comp-item">
                    <h3>📝 Más palabras</h3>
                    <p>${ganadorPalabras}</p>
                    <small>Diferencia: ${diferenciaPalabras} palabras</small>
                </div>
                
                <div class="comp-item">
                    <h3>📊 Densidad</h3>
                    <p>${cap1.referencia}: ${cap1.promedio} palabras/vers</p>
                    <p>${cap2.referencia}: ${cap2.promedio} palabras/vers</p>
                </div>
            </div>
        </div>
    `;
}