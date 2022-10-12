const navBar = document.getElementById("navbar");
const userImages = JSON.parse(localStorage.getItem('images')) || []; //LOADS IMAGES FROM LOCALSTORAGE. IF NULL, THEN RETURNS EMPTY ARRAY.
const gallerySection = document.getElementById('gallery');
gallerySection.style.marginTop = `${navBar.offsetHeight}px`;

ShowPictures();

function ShowPictures() {
  for (image of userImages) {
    const { name, dataUrl } = image;
    const imageCard = document.createElement('div');
    imageCard.classList.add('col');
    imageCard.innerHTML = `<div class="card">
            <img src="${dataUrl}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            </div>`;
    gallerySection.append(imageCard);
  }
}
