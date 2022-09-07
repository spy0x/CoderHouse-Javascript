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
    Escribe 5 para eliminar una imagen añadida en esta sesión.
    Escribe cualquier otra cosa para salir.`
const espacioMaximo = 100 // el usuario puede subir maximo hasta 100mb a la plataforma.
let imagenes = []

// Inicia el programa
main()

function main() {
    alert(textoBienvenida)
    let opciones = [1, 2, 3, 4, 5];
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
                espacioUsado(true);
                break;
            case 5:
                eliminarImagen();
                break;
        }
    } while (opciones.includes(respuesta));
    alert("¡Hasta la próxima!");
}
//AGREGAR IMAGEN
function agregarImagen() {
    if (espacioUsado() >= espacioMaximo) {
        alert("No tienes espacio de almacenamiento disponible")
        return
    }
    let repeticiones;
    while (true) {
        repeticiones = parseInt(prompt("¿Cuántas imágenes quieres agregar?"))
        if (!notANumber(repeticiones)) {
            break;
        }
    }
    for (i = 0; i < repeticiones; i++) {
        let nombre;
        do {
            nombre = prompt(`Ingresa el nombre de la imagen ${i + 1}:`).toLowerCase();
        } while (existeNombre(nombre))
        let tamanio;
        while (true) {
            tamanio = parseInt(prompt(`Ingresa el tamaño de la imagen ${i + 1}:`))
            if (!notANumber(tamanio)) {
                break;
            }
        }
        if (espacioUsado() + tamanio <= espacioMaximo) {
            crearImagen(nombre, tamanio);
        } else {
            alert("Esta imagen excede el espacio máximo de la plataforma. Se ignorará.");
            continue;
        }
    }
}
function crearImagen(nombre, tamanio) {
    const imagen = new Imagen(nombre, tamanio);
    imagenes.push(imagen);
}

// MOSTRAR CANTIDAD DE IMAGENES
function mostrarCantidadImagenes() {
    alert(`Has ingresado ${imagenes.length} imágenes`);
}

// MOSTRAR NOMBRES DE IMAGENES
function mostrarNombresImagenes() {
    let nombreImagenes = [];
    if (imagenes.length > 0) {
        let nombreImagenes = imagenes.map(imagen => imagen.nombre); 
        alert(`Las imágenes que has ingresado son:\n${nombreImagenes.join("\n")}`);
    } else {
        alert("No has ingresado ninguna imagen aún.");
    }
}

// ESPACIO USADO
function espacioUsado(showAlert = false) {
    const tamanio = imagenes.reduce((acumulador, imagen) => acumulador + imagen.tamanio, 0);
    if (showAlert) {
        alert(`Has utilizado ${tamanio} MB de los ${espacioMaximo} MB disponibles.
        ${100 - Math.round((tamanio / espacioMaximo * 100))}% restante disponible.`);
    }
    return tamanio;
}

// ELIMINAR IMAGEN
function eliminarImagen() {
    let nombreImagen = undefined;
    do {
        const respuesta = prompt("Ingresa el nombre de la imagen a eliminar. Escribe 0 para cancelar").toLowerCase();
        if (respuesta == 0) {
            return;
        }
        nombreImagen = imagenes.find(imagen => imagen.nombre == respuesta);
        if (nombreImagen == undefined && respuesta != 0) {
            alert(`No existe ninguna imagen con el nombre ${respuesta}.`);
        }
    } while (nombreImagen == undefined)
    const imageIndex = imagenes.indexOf(nombreImagen);
    imagenes.splice(imageIndex, 1); //Elimina la imagen del array de imagenes agregadas.
    alert("La imagen se ha eliminado exitosamente.");
}

// FUNCIONES VERIFICADORAS
function notANumber(numero) {
    const result = isNaN(numero);
    if (result) {
        alert("Ingresaste un valor inválido. Asegurate de solo ingresar números.");
    }
    return result;
}
function existeNombre(nombre) {
    const result = imagenes.some(imagen => imagen.nombre == nombre)
    if (result) {
        alert("Ya existe una imagen con este nombre. Ingresa otro.");
    }
    return result;
}