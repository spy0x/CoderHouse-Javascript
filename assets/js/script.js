class Imagen {
    constructor(nombre, tamanio) {
        this.nombre = nombre;
        this.tamanio = tamanio;
    }
}
const textoBienvenida = "Bienvenido a tu galería de imágenes virtual."
const textoInstrucciones = `
    Escribe 1 para agregar imagenes.
    Escribe 2 para saber cuantas imágenes has ingresado hasta el momento.
    Escribe 3 para consultar las imágenes que has ingresado en esta sesión.
    Escribe 4 para consultar el espacio utilizado y disponible de esta sesión.
    Escribe cualquier otra cosa para salir.`
const espacioTotal = 10 // el usuario puede subir en total hasta 10mb a la plataforma.
let espacioUtilizado = 0
let imagenes = []


main()

function main() {
    alert(textoBienvenida)
    let opciones = [1, 2, 3, 4];
    let respuesta;
    do {
        respuesta = parseInt(prompt(textoInstrucciones))
        switch (respuesta) {
            case 1:
                agregarImagen();
                break;
            case 2:
                mostrarCantidadImagenes();
                break;
            case 3:
                mostrarNombresImagenes();
                break;
            case 4:
                verEspacio();
                break;
        }
    } while (opciones.includes(respuesta));
    alert("¡Hasta la próxima!");
}

function agregarImagen() {
    if (espacioUtilizado >= espacioTotal) {
        alert("No tienes espacio de almacenamiento disponible")
        return
    }
    let repeticiones = parseInt(prompt("¿Cuántas imágenes quieres agregar?"))
    for (i = 0; i < repeticiones; i++) {
        let nombre = prompt(`Ingresa el nombre de la imagen ${i + 1}:`)
        let tamanio;
        while (true) {
            tamanio = parseInt(prompt(`Ingresa el tamaño de la imagen ${i + 1}:`))
            if (isNaN(tamanio)) {
                alert("Ingresaste un valor inválido. Asegurate de solo ingresar números.")
            } else {
                break;
            }
        }
        if (hayEspacioEnDisco(tamanio)) {
            grabarImagen(nombre, tamanio);
        } else {
            alert("Esta imagen excede el espacio máximo de la plataforma. Se ignorará.");
            continue;
        }
    }
}
function grabarImagen(nombre, tamanio) {
    const imagen = new Imagen(nombre, tamanio);
    espacioUtilizado += imagen.tamanio;
    imagenes.push(imagen);
}
function hayEspacioEnDisco(tamanio) {
    return espacioUtilizado + tamanio <= espacioTotal;
}
function mostrarCantidadImagenes() {
    alert(`Has ingresado ${imagenes.length} imágenes`);
}
function mostrarNombresImagenes() {
    let nombreImagenes = [];
    if (imagenes.length > 0) {
        for (const imagen of imagenes) {
            nombreImagenes.push(imagen.nombre);
        }
        alert(`Las imágenes que has ingresado son:\n${nombreImagenes.join("\n")}`);
    } else {
        alert("No has ingresado ninguna imagen aún.");
    }
}
function verEspacio() {
    alert(`Has utilizado ${espacioUtilizado} MB de los ${espacioTotal} MB disponibles.`);
}