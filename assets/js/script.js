const textoBienvenida = "Bienvenido a tu galería de imágenes virtual."
const textoInstrucciones = `
    Escribe 1 para agregar imagenes.
    Escribe 2 para saber cuantas imágenes has ingresado hasta el momento.
    Escribe 3 para consultar las imágenes que has ingresado en esta sesión.
    Escribe cualquier otra cosa para salir.`
let imagenes = ""
let cantidadImagenes = 0

Main()

function Main(){
    alert(textoBienvenida)
    while (true) {
        let respuesta = parseInt(prompt(textoInstrucciones))
        switch (respuesta) {
            case 1:
                AgregarImagen()
                break;
            case 2:
                MostrarCantidadImagenes()
                break;
            case 3:
                MostrarNombresImagenes()
                break;
            default:
                alert("¡Hasta la próxima!")
                return;
        }
    }
}

function AgregarImagen() {
    let repeticiones = parseInt(prompt("¿Cuántas imágenes quieres agregar?"))
    for (i = 0; i < repeticiones; i++) {
        let nombre = prompt(`Ingresa el nombre de la imagen ${i + 1}:`)
        GrabarImagen(nombre)
    }
}

function GrabarImagen(nombre) {
    imagenes += nombre + " "
    cantidadImagenes++
}
function MostrarCantidadImagenes() {
    alert(`Has ingresado ${cantidadImagenes} imágenes`)
}
function MostrarNombresImagenes() {
    alert(`Las imágenes que has ingresado son: ${imagenes}`)
}

