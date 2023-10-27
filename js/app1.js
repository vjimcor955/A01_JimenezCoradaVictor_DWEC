// Selectores 

const carrito = document.querySelector("#carrito")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const listaCursos = document.querySelector("#lista-cursos")
const vaciarCarritoBTN = document.querySelector("#vaciar-carrito")

// Variables

let articulosCarrito = []


// Listeners

cargarEventsListeners()

function cargarEventsListeners() {
    listaCursos.addEventListener("click", anadirCurso)
    carrito.addEventListener("click", eliminarCurso)

    vaciarCarritoBTN.addEventListener("click", () => {
        articulosCarrito = []
        limpiarHTML()
        actualizarLocalStorage()
    })
}


// Funciones

comprobarLocalStorage()

// Compruebo si el LocalStorage contiene algo y lo muestro
function comprobarLocalStorage() {
    const carritoLS = localStorage.getItem("carrito")
    articulosCarrito = JSON.parse(carritoLS)

    if (articulosCarrito == null) {
        articulosCarrito = []
    } else {
        carritoHTML()
    }
}

// Eliminar curso
function eliminarCurso(evento) {
    if (evento.target.classList.contains("borrar-curso")) {
        const cursoId = evento.target.getAttribute("data-id")

        articulosCarrito = articulosCarrito.filter((curso) => 
            curso.id !== cursoId
        )

        actualizarLocalStorage()
        carritoHTML()
    }
}

// Añadir curso al carrito
function anadirCurso(evento) {
    evento.preventDefault()
    
    if (evento.target.classList.contains("agregar-carrito")) {
        const curso = evento.target.parentElement.parentElement
        leerDatosCurso(curso)
    }

    actualizarLocalStorage()
}

// Lee los datos del curso seleccionado
function leerDatosCurso(curso) {

    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    } 

    // Revisamos si ya existe
    const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id)
    if(existe) {
        const cursos = articulosCarrito.map((curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                return curso
            }
        })
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    carritoHTML()
}

// Mostrar los cursos en el carrito
function carritoHTML() {
    limpiarHTML()
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement("tr")
        row.innerHTML = `
            <td><img src="${imagen}" width="125"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `
        contenedorCarrito.appendChild(row)
    })
}

// Vaciar el carrito
function limpiarHTML() {
    // contenedorCarrito.innerHTML = ""

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.firstChild.remove()
    }
}

// Actualiza el LocalStorage
function actualizarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito)
    )
}