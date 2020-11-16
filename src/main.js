import galleryItems from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.lightbox'),
  lightboxImg: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('.lightbox__button'),
  overlay: document.querySelector('.lightbox__overlay'),
};

// Создание и рендер разметки по массиву данных и  шаблону

function makeGalleryItem({ original, preview, description }, index) {
  return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
                data-source="${original}"
                data-index = ${index};
				alt="${description}"
      />
    </a>
  </li>`;
}

const galleryItemsCreate = galleryItems
  .map((preview, original, description, index) =>
    makeGalleryItem(preview, original, description, index),
  )
  .join('');

refs.gallery.insertAdjacentHTML('beforeend', galleryItemsCreate);

function onClickImage(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  refs.lightboxImg.src = event.target.dataset.source;
  refs.lightboxImg.alt = event.target.alt;
  openModal();
}

function openModal() {
  window.addEventListener('keydown', onEscKeyPress);
  refs.lightbox.classList.add('is-open');
}

function closeModal() {
  refs.lightbox.classList.remove('is-open');
  window.removeEventListener('keydown', onEscKeyPress);
  refs.lightboxImg.src = '';
  refs.lightboxImg.alt = '';
}

// Закрытие модалки по Escape

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    closeModal();
  }
}

// Закрытие модалки по бекдропу ( оверлей)

function overlayClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
}

refs.gallery.addEventListener('click', onClickImage);
refs.closeBtn.addEventListener('click', closeModal);
refs.overlay.addEventListener('click', overlayClick);
