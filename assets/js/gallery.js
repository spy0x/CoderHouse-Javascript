// ALIAS
const DateTime = luxon.DateTime;
// DOM VARIABLES
const navBar = document.getElementById('navbar');
const header = document.getElementsByTagName('header');
const gallerySection = document.getElementById('gallery');
const btnRemove = document.getElementById('btn__remove');
const btnSelect = document.getElementById('btn__select');
const selectOrder = document.getElementById('select__order');

// GLOBAL VARIABLES
const userImages = JSON.parse(localStorage.getItem('images')) || []; //LOADS IMAGES FROM LOCALSTORAGE. IF NULL, THEN RETURNS EMPTY ARRAY.
let selectedCards = [];

// MAIN
selectOrder.value = localStorage.getItem('select_order') || '';
sortUserImages();
clearSelection();
showPictures();
saveUserImages();

// EVENTS
onresize = () => {
  header[0].style.marginTop = `${navBar.offsetHeight}px`;
};
onload = () => {
  header[0].style.marginTop = `${navBar.offsetHeight}px`;
};
btnSelect.onclick = () => {
  clearSelection();
  const cards = document.getElementsByClassName('card');
  if (btnSelect.innerText == 'Select ALL') {
    btnSelect.innerText = 'Deselect ALL';
    for (card of cards) {
      const cardOverlay = card.getElementsByClassName('card__overlay')[0];
      selectedCards.push(card);
      cardOverlay.classList.remove('d-none');
      cardOverlay.classList.add('d-block');
    }
  } else {
    btnSelect.innerText = 'Select ALL';
    for (card of cards) {
      const cardOverlay = card.getElementsByClassName('card__overlay')[0];
      cardOverlay.classList.remove('d-block');
      cardOverlay.classList.add('d-none');
    }
  }
  setRemoveBtn();
};
btnRemove.onclick = () => {
  removeSelectedImages();
  clearSelection();
  setSelectionBtn();
  showPictures();
  saveUserImages();
};
selectOrder.onchange = () => {
  localStorage.setItem('select_order', selectOrder.value);
  sortUserImages();
  clearSelection();
  showPictures();
  saveUserImages();
};
function pictureClickEvent(card) {
  card.onclick = () => {
    const cardOverlay = card.getElementsByClassName('card__overlay')[0];
    if (selectedCards.some((element) => card == element)) {
      selectedCards = selectedCards.filter((element) => element != card);
      cardOverlay.classList.remove('d-block');
      cardOverlay.classList.add('d-none');
    } else {
      selectedCards.push(card);
      cardOverlay.classList.remove('d-none');
      cardOverlay.classList.add('d-block');
    }
    setRemoveBtn();
    setSelectionBtn();
  };
}

// FUNCTIONS
function showPictures() {
  gallerySection.innerHTML = '';
  if (userImages.length == 0) {
    const message = document.createElement('div');
    message.classList.add('w-100', 'text-center', 'text-danger', 'main__section__container', 'p-5');
    message.innerText = 'Your gallery is empty.';
    gallerySection.append(message);
    return;
  }
  for (image of userImages) {
    const { name, size, dataUrl, dt } = image;
    const date = DateTime.fromISO(dt);
    const imageCard = document.createElement('div');
    imageCard.classList.add('col');
    imageCard.innerHTML = `<div class="card h-100">
            <img src="${dataUrl}" class="card-img-top card__img" alt="...">
            <div class="card-body">
            <h5 class="card-title text-center fw-bold" id="name">${name}</h5>
            </div>
            <div class="card-footer bg-warning">
            <div class="d-flex justify-content-between">
            <small>${size.toFixed(2)}MB</small>
            <small>${date.toFormat('dd-MM-yyyy, HH:mm:ss')}</small>
            </div>
            </div>
            <div class="card-img-overlay card__overlay d-none">
            </div>
            </div>
            `;
    gallerySection.append(imageCard);
  }
  const cards = document.getElementsByClassName('card');
  for (element of cards) {
    pictureClickEvent(element);
  }
}
function removeSelectedImages() {
  for (card of selectedCards) {
    const selectedImage = userImages.find(({ name }) => name == card.querySelector('#name').innerText);
    const index = userImages.indexOf(selectedImage);
    if (index > -1) {
      userImages.splice(index, 1);
    }
  }
}
function saveUserImages() {
  localStorage.setItem('images', JSON.stringify(userImages));
}
function clearSelection() {
  btnRemove.style.display = 'none';
  selectedCards = [];
}
function sortUserImages() {
  switch (selectOrder.value) {
    case '1':
      //ORDER BY NAME ASC
      userImages.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case '2':
      //Newest first
      userImages.sort((a, b) => DateTime.fromISO(b.dt).toMillis() - DateTime.fromISO(a.dt).toMillis());
      break;
    case '3':
      //Oldest first
      userImages.sort((a, b) => DateTime.fromISO(a.dt).toMillis() - DateTime.fromISO(b.dt).toMillis());
      break;
  }
}
function setRemoveBtn() {
  btnRemove.style.display = selectedCards.length > 0 ? 'block' : 'none';
  gallerySection.style.marginBottom = `${btnRemove.offsetHeight}px`;
}
function setSelectionBtn() {
  btnSelect.innerText = selectedCards.length > 0 ? 'Deselect ALL' : 'Select ALL';
}
