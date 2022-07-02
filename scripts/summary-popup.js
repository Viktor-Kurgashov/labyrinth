const footer = document.getElementsByClassName('footer')[0];
const summary = document.getElementsByClassName('summary')[0];
const summaryBody = summary.firstElementChild;

const openPopup = () => {
  document.body.style.paddingRight = window.innerWidth - document.body.clientWidth + 'px';
  document.body.style.overflowY = 'hidden';
  footer.classList.add('footer--popup-visible');
  summary.classList.add('summary--popup-visible');
  setTimeout(() => summaryBody.classList.add('summary__body--popup-visible'));
};

const closePopup = () => {
  footer.classList.remove('footer--popup-visible');
  summary.classList.remove('summary--popup-visible');
  summaryBody.classList.remove('summary__body--popup-visible');
  document.body.style.paddingRight = document.body.style.overflowY = '';
};

document.getElementsByClassName('footer__open-popup-btn')[0].addEventListener('click', openPopup);
document.getElementsByClassName('footer__close-popup-btn')[0].addEventListener('click', closePopup);

window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 768px)').matches) closePopup();
});