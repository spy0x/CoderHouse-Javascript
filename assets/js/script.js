// OBJECTS
class Image {
    constructor(name, size, dataUrl) {
        this.name = name;
        this.size = size;
        this.dataUrl = dataUrl;
    }
}
// DOM HTML OBJECTS
const summaryTitle = document.getElementById("summary-title");
const imagesSummary = document.getElementById("images-summary");
const imagesAmount = document.getElementById('cantidad');
const inputFiles = document.getElementById('inputfiles');
const form = document.getElementById('formulario');
const usedMemory = document.getElementById('memory-used')
const totalMemory = document.getElementById('total-memory');
const availableMemory = document.getElementById('memory-available');
const totalImages = document.getElementById('total-images');

// GLOBAL VARIABLES
const maxSpace = 100 // USER MAX UPLOAD TO PLATFORM
const maxFiles = 10; // MAX UPLOAD FILE INPUTS AT A TIME
let userImages = JSON.parse(localStorage.getItem('images')) || []; //Loads images from localStorage. If null, then returns empty array.
let usedSpace;


// MAIN
updateStats();


// EVENTS
imagesAmount.oninput = () => {
    imagesAmount.value = Math.max(0, Math.min(imagesAmount.value, maxFiles)); //CLAMPS VALUE TO MIN=0 AND MAX=10
    const veces = parseInt(imagesAmount.value);
    inputFiles.innerHTML = ''; //CLEARS PREVIOUS FILE INPUT ELEMENTS IF ANY.
    for (i = 0; i < veces; i++) {
        const fileUpload = document.createElement('div');
        fileUpload.innerHTML = `<input class="uploadinput d-block mx-auto my-2" type="file" name="img" accept="image/*" value=Select>`
        inputFiles.append(fileUpload);
    }
}
form.onsubmit = (e) => {
    e.preventDefault();
    const uploads = document.getElementsByClassName('uploadinput');
    const userUploads = Array.from(uploads).filter(element => element.files.length > 0) // CONVERTS HTML COLLECTION TO ARRAY AND REMOVES EMPTY UPLOAD INPUT FILES.
    createImages(userUploads);
    updateStats();
    showSummary(userUploads);
    clearFileInputs(userUploads);
}
// FUNCTIONS
function createImages(uploadList) {
    for (upload of uploadList) {
        const {name, size} = upload.files[0];
        const reader = new FileReader(); // JS OBJECT FOR STORAGE USER FILE AT BUFFER.
        reader.readAsDataURL(upload.files[0]);
        const image = new Image(name, toMB(size), reader.result);
        userImages.push(image);
    }
}

// DOM FUNCTIONS
function showSummary(userUploads) {
    clearSummary();
    if (userUploads.length > 0) {
        const title = document.createElement("h2");
        title.innerText = "SUMMARY";
        title.classList.add("fw-bold");
        summaryTitle.append(title);
        const subtitle = document.createElement("h4");
        subtitle.innerText = "Successfully uploaded images:"
        imagesSummary.append(subtitle)
        for (image of userUploads) {
            const file = image.files[0];
            const imageName = document.createElement("p");
            imageName.innerText = `${file.name} - ${toMB(file.size).toFixed(2)}MB`;
            imagesSummary.append(imageName);
        }
        imagesSummary.innerHTML += `<p><span class="fw-bold">Uploaded Images:</span> ${userUploads.length}</p>`;
        const totalSize = toMB(userUploads.reduce((accumulator, images) => accumulator + images.files[0].size, 0)); //CONVERTS TOTAL USER UPLOADED IMAGES BYTES TO MB. 
        const uploadsSizeSummary = document.createElement("p");
        uploadsSizeSummary.innerHTML = `<span class="fw-bold">Used Memory:</span> ${totalSize.toFixed(2)}MB <small>(${(100 - (usedSpace / maxSpace * 100)).toFixed(2)}% free space)</small>`
        imagesSummary.append(uploadsSizeSummary);
        imagesSummary.className = "text-center mb-3 p-3";
    } else {
        imagesSummary.innerText = `You haven't chosen any images yet.`;
        imagesSummary.className = "text-center mb-3 p-3 text-danger";
    }
}
function clearSummary() {
    summaryTitle.innerHTML = '';
    imagesSummary.innerHTML = '';
}
function updateStats() {
    usedSpace = userImages.length > 0 ? userImages.reduce((accumulator, images) => accumulator + images.size, 0) : 0;
    usedMemory.innerText = `${usedSpace.toFixed(2)}MB`;
    availableMemory.innerText = `${(maxSpace - usedSpace).toFixed(2)}MB`;
    totalImages.innerText = userImages.length;
    totalMemory.innerText = `${maxSpace}MB`;
    localStorage.setItem('images', JSON.stringify(userImages));
}
function clearFileInputs(uploadList) {
    uploadList.forEach(element => {
        element.value = "";
    });
}
// TOOL FUNCTIONS
function toMB(bytes) {
    return bytes / 1048576;
}
