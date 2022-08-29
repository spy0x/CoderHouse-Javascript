const textoBienvenida = "Bienvenido a tu galería de imágenes virtual."
const textoInstrucciones = `
    Escribe 1 para agregar imagenes.
    Escribe 2 para saber cuantas imágenes has ingresado hasta el momento.
    Escribe 3 para consultar las imágenes que has ingresado en esta sesión.
    Escribe 4 para consultar el espacio utilizado y disponible de esta sesión.
    Escribe cualquier otra cosa para salir.`
const espacioTotal = 10 // el usuario puede subir en total hasta 10mb a la plataforma.
let espacioUtilizado = 0
let cantidadImagenes = 0
let imagenes = ""


Main()

function Main() {
    alert(textoBienvenida)
    while (true) {
        let respuesta = parseInt(prompt(textoInstrucciones))
        switch (respuesta) {
            case 1:
                AgregarImagen()
                break
            case 2:
                MostrarCantidadImagenes()
                break
            case 3:
                MostrarNombresImagenes()
                break
            case 4:
                VerEspacio()
                break
            default:
                alert("¡Hasta la próxima!")
                return
        }
    }
}

function AgregarImagen() {
    if (espacioUtilizado >= espacioTotal) {
        alert("No tienes espacio de almacenamiento disponible")
        return
    }
    let repeticiones = parseInt(prompt("¿Cuántas imágenes quieres agregar?"))
    for (i = 0; i < repeticiones; i++) {
        let nombre = prompt(`Ingresa el nombre de la imagen ${i + 1}:`)
        let tamanio = parseInt(prompt(`Ingresa el tamaño de la imagen ${i + 1}:`))
        if (HayEspacioEnDisco(tamanio)) {
            GrabarImagen(nombre, tamanio)
        } else {
            alert("Esta imagen excede el espacio máximo de la plataforma. Se ignorará.")
            continue
        }
    }
}
function GrabarImagen(nombre, tamanio) {
    imagenes += nombre + " "
    cantidadImagenes++
    espacioUtilizado += tamanio
}
function HayEspacioEnDisco(tamanio) {
    return espacioUtilizado + tamanio <= espacioTotal
}
function MostrarCantidadImagenes() {
    alert(`Has ingresado ${cantidadImagenes} imágenes`)
}
function MostrarNombresImagenes() {
    if (cantidadImagenes > 0) {
        alert(`Las imágenes que has ingresado son: ${imagenes}`)
    } else {
        alert("No has ingresado ninguna imágen aún.")
    }
}
function VerEspacio() {
    alert(`Has utilizado ${espacioUtilizado} MB de los ${espacioTotal} MB disponibles.`)
}