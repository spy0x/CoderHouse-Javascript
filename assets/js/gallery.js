// DOM VARIABLES
const navBar = document.getElementById('navbar');
const gallerySection = document.getElementById('gallery');
const btnRemove = document.getElementById('btn__remove');

// GLOBAL VARIABLES
const userImages = JSON.parse(localStorage.getItem('images')) || []; //LOADS IMAGES FROM LOCALSTORAGE. IF NULL, THEN RETURNS EMPTY ARRAY.
let selectedCards = [];

// MAIN
btnRemove.style.display = 'none';
showPictures();
const cards = document.getElementsByClassName('card');
for (element of cards) {
  pictureClickEvent(element);
}
// EVENTS
onresize = () => (gallerySection.style.marginTop = `${navBar.offsetHeight}px`);
onload = () => (gallerySection.style.marginTop = `${navBar.offsetHeight}px`);
btnRemove.onclick = () => {
  removeSelectedImages();
  localStorage.setItem('images', JSON.stringify(userImages));
  showPictures();
};
function removeSelectedImages() {
  for (card of selectedCards) {
    const selectedImage = userImages.find(({ name }) => name == card.querySelector('#name').innerText);
    const index = userImages.indexOf(selectedImage);
    if (index > -1) {
      userImages.splice(index, 1);
    }
  }
}

function pictureClickEvent(card) {
  card.onclick = () => {
    if (selectedCards.some((element) => card == element)) {
      selectedCards = selectedCards.filter((element) => element != card);
      card.style.background = '#FFFFFF';
    } else {
      selectedCards.push(card);
      card.style.background = 'linear-gradient(0deg, rgba(200, 200, 200, 1) 0%, rgba(248, 251, 255, 1) 100%)';
    }
    btnRemove.style.display = selectedCards.length > 0 ? 'block' : 'none';
    ;
  };
}

// FUNCTIONS
function showPictures() {
  gallerySection.innerHTML = '';
  for (image of userImages) {
    const { name, dataUrl } = image;
    const imageCard = document.createElement('div');
    imageCard.classList.add('col');
    imageCard.innerHTML = `<div class="card h-100">
            <img src="${dataUrl}" class="card-img-top card__img" alt="...">
            <div class="card-body">
            <h5 class="card-title" id="name">${name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            </div>`;
    gallerySection.append(imageCard);
  }
}
