const uploadSection = document.getElementById("upload");
const navBar = document.getElementById("navbar");

setUploadSectionScrollOffset();

onresize = setUploadSectionScrollOffset;

function setUploadSectionScrollOffset() {
    uploadSection.style.scrollMarginTop = `${navBar.offsetHeight}px`;
}