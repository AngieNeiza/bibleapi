// Lista de todos los libros de la Biblia con sus capítulos
var libros = [
    {name: "genesis", chapters: 50},
    {name: "exodus", chapters: 40},
    {name: "leviticus", chapters: 27},
    {name: "numbers", chapters: 36},
    {name: "deuteronomy", chapters: 34},
    {name: "joshua", chapters: 24},
    {name: "judges", chapters: 21},
    {name: "ruth", chapters: 4},
    {name: "1samuel", chapters: 31},
    {name: "2samuel", chapters: 24},
    {name: "1kings", chapters: 22},
    {name: "2kings", chapters: 25},
    {name: "1chronicles", chapters: 29},
    {name: "2chronicles", chapters: 36},
    {name: "ezra", chapters: 10},
    {name: "nehemiah", chapters: 13},
    {name: "esther", chapters: 10},
    {name: "job", chapters: 42},
    {name: "psalms", chapters: 150},
    {name: "proverbs", chapters: 31},
    {name: "ecclesiastes", chapters: 12},
    {name: "song of solomon", chapters: 8},
    {name: "isaiah", chapters: 66},
    {name: "jeremiah", chapters: 52},
    {name: "lamentations", chapters: 5},
    {name: "ezekiel", chapters: 48},
    {name: "daniel", chapters: 12},
    {name: "hosea", chapters: 14},
    {name: "joel", chapters: 3},
    {name: "amos", chapters: 9},
    {name: "obadiah", chapters: 1},
    {name: "jonah", chapters: 4},
    {name: "micah", chapters: 7},
    {name: "nahum", chapters: 3},
    {name: "habakkuk", chapters: 3},
    {name: "zephaniah", chapters: 3},
    {name: "haggai", chapters: 2},
    {name: "zechariah", chapters: 14},
    {name: "malachi", chapters: 4},
    {name: "matthew", chapters: 28},
    {name: "mark", chapters: 16},
    {name: "luke", chapters: 24},
    {name: "john", chapters: 21},
    {name: "acts", chapters: 28},
    {name: "romans", chapters: 16},
    {name: "1corinthians", chapters: 16},
    {name: "2corinthians", chapters: 13},
    {name: "galatians", chapters: 6},
    {name: "ephesians", chapters: 6},
    {name: "philippians", chapters: 4},
    {name: "colossians", chapters: 4},
    {name: "1thessalonians", chapters: 5},
    {name: "2thessalonians", chapters: 3},
    {name: "1timothy", chapters: 6},
    {name: "2timothy", chapters: 4},
    {name: "titus", chapters: 3},
    {name: "philemon", chapters: 1},
    {name: "hebrews", chapters: 13},
    {name: "james", chapters: 5},
    {name: "1peter", chapters: 5},
    {name: "2peter", chapters: 3},
    {name: "1john", chapters: 5},
    {name: "2john", chapters: 1},
    {name: "3john", chapters: 1},
    {name: "jude", chapters: 1},
    {name: "revelation", chapters: 22}
];

var capitulos = [];
var totalCapitulos = 0;

// Generar lista de todos los capítulos
function generarListaCapitulos() {
    capitulos = [];
    let id = 1;
    for (let i = 0; i < libros.length; i++) {
        for (let cap = 1; cap <= libros[i].chapters; cap++) {
            capitulos.push({
                id: id,
                libro: libros[i].name,
                capitulo: cap,
                referencia: `${libros[i].name} ${cap}`
            });
            id++;
        }
    }
    totalCapitulos = capitulos.length;
    return capitulos;
}

async function Conexion(filtroLibro) {
    if (filtroLibro === "All") {
        return capitulos;
    } else {
        const capitulosFiltrados = [];
        for (let i = 0; i < capitulos.length; i++) {
            if (capitulos[i].libro.toLowerCase() === filtroLibro.toLowerCase()) {
                capitulosFiltrados.push(capitulos[i]);
            }
        }
        return capitulosFiltrados;
    }
}

async function General() {
    if (capitulos.length === 0) {
        generarListaCapitulos();
        capitulos = await Conexion("All");
    }
    Home();
}

async function FiltroConexion(ElFiltro) {
    document.getElementById("la-lista").innerHTML = "";
    capitulos = await Conexion(ElFiltro);
    const listaHTML = generarLista(capitulos);
    document.getElementById("la-lista").innerHTML = listaHTML;
}