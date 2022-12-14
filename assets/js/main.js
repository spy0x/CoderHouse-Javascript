// ALIAS
const DateTime = luxon.DateTime;

// OBJECTS
class Image {
  constructor(name, size, dataUrl, dateTime) {
    this.name = name;
    this.size = size;
    this.dataUrl = dataUrl;
    this.dt = dateTime;
  }
}
// DOM HTML OBJECTS
const imagesSummary = document.getElementById('images-summary');
const imagesAmount = document.getElementById('cantidad');
const inputFiles = document.getElementById('inputfiles');
const form = document.getElementById('formulario');

// GLOBAL VARIABLES
const hasLoadedSampleData = localStorage.getItem('sample_data') || false;
const maxSpace = 10; // USER MAX MB UPLOAD TO PLATFORM
const maxFiles = 10; // MAX UPLOAD FILE INPUTS AT A TIME
const canUploadAgain = false; // DEFAULT=FALSE. USERS CAN'T UPLOAD AN IMAGE ALREADY IN THE GALLERY WITH THE SAME NAME.
const userImages = JSON.parse(localStorage.getItem('images')) || []; //LOADS IMAGES FROM LOCALSTORAGE. IF NULL, THEN RETURNS EMPTY ARRAY.
let usedSpace; //USER USED SPACE IN MEGABYTES.

// SWEET ALERT FUNCTIONS
const alertError = (message) =>
  Swal.fire({
    title: 'ERROR',
    icon: 'error',
    text: message,
    confirmButtonColor: '#0f1620',
  });

// MAIN
loadSampleData();
updateStats();

// EVENTS
imagesAmount.oninput = () => {
  clearSummary();
  imagesAmount.value = Math.max(0, Math.min(imagesAmount.value, maxFiles)); //CLAMPS VALUE TO MIN=0 AND MAX=10
  const veces = parseInt(imagesAmount.value);
  inputFiles.innerHTML = ''; //CLEARS PREVIOUS FILE INPUT ELEMENTS IF ANY.
  for (i = 0; i < veces; i++) {
    const fileInput = document.createElement('div');
    fileInput.innerHTML = `<input class="uploadinput d-block mx-auto my-2" type="file" name="img" accept="image/*" value=Select>`;
    inputFiles.append(fileInput);
    createInputEvent(fileInput);
  }
};
form.onsubmit = (e) => {
  e.preventDefault();
  const uploads = document.getElementsByClassName('uploadinput');
  const userUploads = Array.from(uploads).filter((element) => element.files.length > 0); // CONVERTS HTML COLLECTION TO ARRAY AND REMOVES EMPTY UPLOAD INPUT FILES.
  if (userUploads.length == 0) {
    imagesSummary.innerText = `You haven't chosen any images yet.`;
  } else {
    createImages(userUploads);
  }
};
function createInputEvent(fileInput) {
  fileInput.children[0].onchange = ({ target }) => {
    const imageName = target.files[0].name;
    const usedFileInputs = Array.from(document.getElementsByClassName('uploadinput')).filter((element) => element.files.length > 0); //GET ONLY USED FILE INPUTS. REMOVE EMPTY ONES.
    const isAlreadyInInputs = usedFileInputs.filter((element) => element.files[0].name == imageName).length > 1; //COUNTS HOW MANY ITEMS EXISTS WITH THE SAME NAME IN THE FILE INPUTS. MORE THAN 1 RETURNS TRUE.
    const isAlreadyInGallery = userImages.some((element) => element.name == imageName); //RETURNS TRUE IF THE SAME NAME EXISTS ALREADY IN LOCALSTORAGE IMAGE LIST.
    const totalSizeInInputs = toMB(usedFileInputs.reduce((accumulator, image) => accumulator + image.files[0].size, 0)); //GETS THE TOTAL FILESIZE IN FILE INPUTS IN MEGABYTES.
    if (isAlreadyInInputs) {
      target.value = '';
      alertError('You have already selected this image.');
    } else if (!canUploadAgain && isAlreadyInGallery) {
      target.value = '';
      alertError('This image already exists in the gallery.');
    } else if (totalSizeInInputs + usedSpace > maxSpace) {
      target.value = '';
      alertError('This image exceeds your maximum storage space in the gallery.');
    }
    clearSummary();
  };
}

// FUNCTIONS
function toMB(bytes) {
  return bytes / 1048576;
}
function showSummary(userUploads) {
  const totalSize = toMB(userUploads.reduce((accumulator, images) => accumulator + images.files[0].size, 0)); //CONVERTS TOTAL USER UPLOADED IMAGES BYTES TO MB.
  let imagesName = '';
  for (image of userUploads) {
    const file = image.files[0];
    imagesName += `<p><small>${file.name} - ${toMB(file.size).toFixed(2)}MB</small></p>`;
  }
  Swal.fire({
    title: 'SUMMARY',
    icon: 'success',
    html: `<h4 class="mb-2">Succesfully uploaded images:</h4>
        ${imagesName}
        <p class="mt-3"><span class="fw-bold">Uploaded Images:</span> ${userUploads.length}</p>
        <span class="fw-bold">Used Memory:</span> ${totalSize.toFixed(2)}MB
        <small>(${(100 - (usedSpace / maxSpace) * 100).toFixed(2)}% free space)</small>`,
    showCloseButton: true,
    confirmButtonText: 'Close',
    confirmButtonColor: '#0f1620',
    footer: '<a class="fw-bold link-primary text-decoration-none" href="./gallery.html">GO TO GALLERY</a>',
  });
  clearSummary();
}
function updateStats() {
  usedSpace = userImages.length > 0 ? userImages.reduce((accumulator, images) => accumulator + images.size, 0) : 0;
  localStorage.setItem('images', JSON.stringify(userImages));
}
function clearSummary() {
  imagesSummary.innerHTML = '';
}
function clearFileInputs(uploadList) {
  uploadList.forEach((element) => {
    element.value = '';
  });
}

//PROMISES
function getDataURL(file) {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = (e) => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

// AJAX
async function createImages(uploadList) {
  for (upload of uploadList) {
    const { name, size } = upload.files[0];
    const dataURL = await getDataURL(upload.files[0]);
    const dt = DateTime.now();
    const image = new Image(name, toMB(size), dataURL, dt);
    userImages.push(image);
  }
  updateStats();
  showSummary(uploadList);
  clearFileInputs(uploadList);
}
async function loadSampleData() {
  if (hasLoadedSampleData) {
    return;
  }
  const fetch_data = await fetch('../sample_data.json');
  const result = await fetch_data.json();
  userImages.push(...result);
  updateStats();
  localStorage.setItem('sample_data', true);
}
