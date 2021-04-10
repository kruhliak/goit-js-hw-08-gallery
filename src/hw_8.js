import galleryItems from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".lightbox");
const modalImgRef = document.querySelector(".lightbox__image");
const modalBtnRef = document.querySelector(".lightbox__button");

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

function onGalleryClick(e) {
  const swatchEl = e.target;

  e.preventDefault();

  if (!swatchEl.classList.contains("gallery__image")) {
    return;
  }
  //   console.log(swatchEl.dataset.source);
  modalRef.classList.add("is-open");
  modalImgRef.setAttribute("src", swatchEl.dataset.source);
}

modalBtnRef.addEventListener("click", onModalBtn);

function onModalBtn(e) {
  //   console.log(e.target);
  if (!e.target.classList.contains("lightbox__button")) {
    return;
  }
  modalRef.classList.remove("is-open");
}
