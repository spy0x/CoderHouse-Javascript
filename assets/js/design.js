const uploadSection = document.getElementById("upload");
const navBar = document.getElementById("navbar");

setUploadSectionScrollOffset();
setNasaPicture();

onresize = setUploadSectionScrollOffset;

function setUploadSectionScrollOffset() {
    uploadSection.style.scrollMarginTop = `${navBar.offsetHeight}px`;
}

// AJAX
async function setNasaPicture()
{
    const nasaImage = document.getElementById("nasa_picture");
    const nasa_data = await fetch('https://api.nasa.gov/planetary/apod?api_key=bJZsLNUVSmRUjmQutduKbILfloBZw61P8C488kxu');
    const result = await nasa_data.json();
    //INFO FOR DOM
    const mediaType = result.media_type;
    const url = result.url;
    // const title = result.title;
    nasaImage.src = url;
    nasaImage.type = mediaType;
}