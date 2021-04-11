import galleryItems from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".lightbox");
const modalImgRef = document.querySelector(".lightbox__image");

const galerryItemsMarkup = createGalleryItem(galleryItems);
galleryRef.insertAdjacentHTML("beforeend", galerryItemsMarkup);

function createGalleryItem(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join("");
}

galleryRef.addEventListener("click", onGalleryClick);
modalRef.addEventListener("click", onModalAction);

function onGalleryClick(e) {
  e.preventDefault();

  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  onOpenModal(e);
}
function onOpenModal(e) {
  window.addEventListener("keydown", onKeyboardPress);
  modalRef.classList.add("is-open");
  modalImgRef.setAttribute("src", e.target.dataset.source);
}
function onCloseModal() {
  modalRef.classList.remove("is-open");
  window.removeEventListener("keydown", onKeyboardPress);
}
function onModalAction(e) {
  onModalBtnClick(e);
  onOverlayClick(e);
  onKeyPressEsc(e);
}
function onModalBtnClick(e) {
  if (!e.target.classList.contains("lightbox__button")) {
    return;
  }
  onCloseModal();
}
function onOverlayClick(e) {
  if (!e.target.classList.contains("lightbox__overlay")) {
    return;
  }
  onCloseModal();
}
function onKeyboardPress(e) {
  onKeyPressEsc(e);
}
function onKeyPressEsc(e) {
  if (e.code !== "Escape") {
    return;
  }
  onCloseModal();
}
