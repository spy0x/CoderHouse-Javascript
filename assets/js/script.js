// OBJETO IMAGEN
class Imagen {
    constructor(nombre, tamanio) {
        this.nombre = nombre;
        this.tamanio = tamanio;
    }
}
//Objetos del DOM
const subtitle = document.getElementById("subtitulo");
const nImagenes = document.getElementById("n_imagenes");
const cantidadInput = document.getElementById('cantidad');
const inputFiles = document.getElementById('inputfiles');
const form = document.getElementById('formulario');
const infoEspacio = document.getElementById('info-espacio');
const usedMemory = document.getElementById('memory-used')
const totalMemory = document.getElementById('total-memory');
const availableMemory = document.getElementById('memory-available');
const totalImages = document.getElementById('total-images');

// Variables Globales
const espacioMaximo = 100 // el usuario puede subir maximo hasta 100mb a la plataforma.
const maxFiles = 10; //El usuario puede ingresar maximo 10 imagenes
let imagenes = localStorage.getItem('images');
let usedSpace = 0; 

const reader = new FileReader();
const preview = document.querySelector('#img');
preview.src = localStorage.getItem('imagenPrueba');

// MAIN
imagenes = imagenes == null ? [] : JSON.parse(imagenes);
updateStats();


// Eventos
cantidadInput.oninput = () => {
    cantidadInput.value = Math.max(0, Math.min(cantidadInput.value, maxFiles)); //Hace un clamp del valor ingresado min=0 y max=10
    const veces = parseInt(cantidadInput.value);
    inputFiles.innerHTML = ''; //Hace un clear a la cantidad de elementos previos
    for (i = 0; i < veces; i++) {
        const fileUpload = document.createElement('div');
        fileUpload.innerHTML = `<input class="uploadinput d-block mx-auto my-2" type="file" name="img" accept="image/*" value=Select>`
        inputFiles.append(fileUpload);
    }
}
form.onsubmit = (e) => {
    e.preventDefault();
    const uploads = document.getElementsByClassName('uploadinput');
    const userUploads = Array.from(uploads).filter(element => element.files.length > 0) // filtra los file inputs solo los que el usuario les cargó efectivamente una imagen.
    createImages(userUploads);
    updateStats();
    // mostrarResumen();
}
reader.onload = () => {
    preview.src = reader.result;
    localStorage.setItem('imagenPrueba', reader.result);
}
// Funciones
function createImages(uploadList) {
    for (upload of uploadList) {
        const nombre = upload.files[0].name;
        const tamanio = upload.files[0].size / 1048576; //el tamaño se convierte de bytes a MB.
        const imagen = new Imagen(nombre, tamanio);
        // const test = URL.createObjectURL(upload.files[0]);
        // console.log(test);
        reader.readAsDataURL(upload.files[0]);
        imagenes.push(imagen);
    }
}

// DOM Funciones
function mostrarResumen() {
    clearInfo();
    const text = document.createElement("h2");
    text.innerText = "Resumen de tus acciones";
    subtitle.append(text);
    if (imagenes.length > 0) {
        nImagenes.innerHTML = `<h4>Cantidad de imágenes:</h4>
            <p>${imagenes.length}</p>`;
        const nombreImagenes = imagenes.map(imagen => imagen.nombre);
        const tituloListaNombres = document.createElement("h4");
        tituloListaNombres.innerText = "Nombres de Imágenes ingresadas:"
        nImagenes.append(tituloListaNombres)
        for (nombre of nombreImagenes) {
            const nombreImagen = document.createElement("p");
            nombreImagen.innerText = `${nombre}`;
            nImagenes.append(nombreImagen);
        }
    } else {
        nImagenes.innerText = `No ingresaste ninguna imagen`;
    }
    const tamanio = imagenes.reduce((acumulador, imagen) => acumulador + imagen.tamanio, 0);
    
    const espacioUsado = document.createElement("h5");
    espacioUsado.innerText = `Has utilizado ${tamanio.toFixed(2)} MB de los ${espacioMaximo} MB disponibles.
    ${(100 - (tamanio / espacioMaximo * 100)).toFixed(2)}% restante disponible.`
    infoEspacio.append(espacioUsado);
}
function clearInfo() {
    subtitle.innerHTML = '';
    nImagenes.innerHTML = '';
    infoEspacio.innerHTML = '';
}
function updateStats(){
    if (imagenes.length > 0){
        usedSpace = imagenes.reduce((acumulador, imagen) => acumulador + imagen.tamanio, 0);
    }
    else {
        usedSpace = 0;
    }
    usedMemory.innerText = `${usedSpace.toFixed(2)}MB`;
    availableMemory.innerText = `${(espacioMaximo - usedSpace).toFixed(2)}MB`;
    totalImages.innerText = imagenes.length;
    totalMemory.innerText = `${espacioMaximo}MB`;
    localStorage.setItem('images', JSON.stringify(imagenes));
}
