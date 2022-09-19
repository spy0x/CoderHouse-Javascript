// OBJECTS
class Image {
    constructor(name, size, dataUrl) {
        this.name = name;
        this.size = size;
        this.dataUrl = dataUrl;
    }
}
// DOM HTML OBJECTS
const summaryTitle = document.getElementById("summaryTitle");
const imagesSummary = document.getElementById("n_imagenes");
const imagesAmount = document.getElementById('cantidad');
const inputFiles = document.getElementById('inputfiles');
const form = document.getElementById('formulario');
const spaceInfo = document.getElementById('info-espacio');
const usedMemory = document.getElementById('memory-used')
const totalMemory = document.getElementById('total-memory');
const availableMemory = document.getElementById('memory-available');
const totalImages = document.getElementById('total-images');

// GLOBAL VARIABLES
const maxSpace = 100 // USER MAX UPLOAD TO PLATFORM
const maxFiles = 10; // MAX UPLOAD FILE INPUTS AT A TIME
let userImages = localStorage.getItem('images');
let usedSpace = 0;


// MAIN
userImages = userImages == null ? [] : JSON.parse(userImages);
updateStats();


// EVENTS
imagesAmount.oninput = () => {
    imagesAmount.value = Math.max(0, Math.min(imagesAmount.value, maxFiles)); //CLAMPS VALUE TO MIN=0 AND MAX=10
    const veces = parseInt(imagesAmount.value);
    inputFiles.innerHTML = ''; //CLEARS PREVIOUS HTML SUMMARY ELEMENTS IF ANY.
    for (i = 0; i < veces; i++) {
        const fileUpload = document.createElement('div');
        fileUpload.innerHTML = `<input class="uploadinput d-block mx-auto my-2" type="file" name="img" accept="image/*" value=Select>`
        inputFiles.append(fileUpload);
    }
}
form.onsubmit = (e) => {
    e.preventDefault();
    const uploads = document.getElementsByClassName('uploadinput');
    const userUploads = Array.from(uploads).filter(element => element.files.length > 0) // REMOVES EMPTY UPLOAD INPUT FILES.
    createImages(userUploads);
    updateStats();
    showSummary(userUploads);
}
// FUNCTIONS
function createImages(uploadList) {
    for (upload of uploadList) {
        const file = upload.files[0];
        const name = file.name;
        const size = toMB(file.size); // SIZE CONVERTED TO MB.
        const reader = new FileReader(); // JS OBJECT FOR STORAGE USER FILE AT BUFFER.
        reader.readAsDataURL(file);
        const image = new Image(name, size, reader.result);
        userImages.push(image);
    }
}

// DOM FUNCTIONS
function showSummary(userUploads) {
    clearInfo();
    if (userUploads.length > 0) {
        const title = document.createElement("h2");
        title.innerText = "SUMMARY";
        summaryTitle.append(title);
        imagesSummary.innerHTML = `<h4>Number of images:</h4>
            <p>${userUploads.length}</p>`;
        const subtitle = document.createElement("h4");
        subtitle.innerText = "Successfully uploaded images:"
        imagesSummary.append(subtitle)
        for (image of userUploads) {
            const file = image.files[0];
            const imageName = document.createElement("p");
            imageName.innerText = `${file.name} - ${toMB(file.size).toFixed(2)}MB`;
            imagesSummary.append(imageName);
        }
        const totalSize = toMB(userUploads.reduce((accumulator, images) => accumulator + images.files[0].size, 0)); //CONVERTS TOTAL USER UPLOADED IMAGES BYTES TO MB. 
        const uploadsSizeSummary = document.createElement("h5");
        uploadsSizeSummary.innerText = `You've just spent ${totalSize.toFixed(2)} MB of ${maxSpace} MB total space.
        ${(100 - (totalSize / maxSpace * 100)).toFixed(2)}% free space available.`
        spaceInfo.append(uploadsSizeSummary);
    } else {
        imagesSummary.innerText = `You haven't chosen any images yet.`;
    }
}
function clearInfo() {
    summaryTitle.innerHTML = '';
    imagesSummary.innerHTML = '';
    spaceInfo.innerHTML = '';
}
function updateStats() {
    if (userImages.length > 0) {
        usedSpace = userImages.reduce((accumulator, images) => accumulator + images.size, 0);
    }
    else {
        usedSpace = 0;
    }
    usedMemory.innerText = `${usedSpace.toFixed(2)}MB`;
    availableMemory.innerText = `${(maxSpace - usedSpace).toFixed(2)}MB`;
    totalImages.innerText = userImages.length;
    totalMemory.innerText = `${maxSpace}MB`;
    localStorage.setItem('images', JSON.stringify(userImages));
}
// TOOL FUNCTIONS
function toMB(bytes) {
    return bytes / 1048576;
}
