// DOM VARIABLES
const maxSpace = 10; // USER MAX MB UPLOAD TO PLATFORM
const navBar = document.getElementById('navbar');
const statsSection = document.getElementById('stats');
const usedMemory = document.getElementById('memory-used');
const totalMemory = document.getElementById('total-memory');
const availableMemory = document.getElementById('memory-available');
const totalImages = document.getElementById('total-images');

// GLOBAL VARIABLES
const userImages = JSON.parse(localStorage.getItem('images')) || []; //LOADS IMAGES FROM LOCALSTORAGE. IF NULL, THEN RETURNS EMPTY ARRAY.

// MAIN
showStats();
console.log(statsSection);

// EVENTS
onresize = () => {
  statsSection.style.marginTop = `${navBar.offsetHeight}px`;
};
onload = () => {
  statsSection.style.marginTop = `${navBar.offsetHeight}px`;
};

// FUNCTIONS
function showStats() {
  const usedSpace = userImages.length > 0 ? userImages.reduce((accumulator, images) => accumulator + images.size, 0) : 0;
  usedMemory.innerText = `${usedSpace.toFixed(2)}MB`;
  availableMemory.innerText = `${(maxSpace - usedSpace).toFixed(2)}MB`;
  totalImages.innerText = userImages.length;
  totalMemory.innerText = `${maxSpace}MB`;
}
