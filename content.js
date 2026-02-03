const MODAL_SELECTOR = 'div.modal.agreement-modal#max-modal';

const removeModalIfPresent = () => {
  const modal = document.querySelector(MODAL_SELECTOR);
  if (modal) {
    modal.remove();
  }
};

removeModalIfPresent();

const observer = new MutationObserver(() => {
  removeModalIfPresent();
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});
