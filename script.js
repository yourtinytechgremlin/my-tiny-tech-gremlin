const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const modal = document.querySelector("[data-modal]");
const modalImage = document.querySelector("[data-modal-image]");
const modalTitle = document.querySelector("[data-modal-title]");
const closeButtons = document.querySelectorAll("[data-close-modal]");
const sampleCards = document.querySelectorAll(".sample-card");
const modalPlaceholder = "assets/favicon.svg";
let lastFocusedElement = null;

function openSample(card) {
  if (!modal || !modalImage || !modalTitle) return;

  lastFocusedElement = document.activeElement;
  const title = card.dataset.title || "Portfolio sample";
  const fullImage = card.dataset.full;
  const previewImage = card.querySelector("img");

  if (!fullImage || !previewImage) return;

  modalImage.src = fullImage;
  modalImage.alt = previewImage.alt;
  modalTitle.textContent = title;
  modal.hidden = false;
  document.body.classList.add("modal-open");

  const closeButton = modal.querySelector(".modal-close");
  if (closeButton instanceof HTMLButtonElement) {
    closeButton.focus();
  }
}

function closeSample() {
  if (!modal || !modalImage || !modalTitle) return;

  modal.hidden = true;
  modalImage.src = modalPlaceholder;
  modalImage.alt = "";
  modalTitle.textContent = "";
  document.body.classList.remove("modal-open");

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

sampleCards.forEach((card) => {
  card.addEventListener("click", () => openSample(card));
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeSample);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) {
    closeSample();
  }
});
