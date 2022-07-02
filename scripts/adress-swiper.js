class Swiper {
  constructor(container, btnLeft, btnRight) {
    this.container = container;
    this.stack = container.firstElementChild;
    this.btnLeft = btnLeft;
    this.btnRight = btnRight;

    this.touchFrom = this.touchCurrent = 0;
    this.currentSlide = 0;
    this.active = true;
    this.setSizes();

    window.addEventListener('resize', () => this.setSizes());
    this.stack.addEventListener('transitionend', () => this.unlock());

    this.container.addEventListener('touchstart', (e) => this.touchStart(e));
    this.container.addEventListener('touchmove', (e) => this.touchMove(e));
    this.container.addEventListener('touchend', () => this.touchEnd());

    this.btnRight.addEventListener('click', () => this.select(1));
    this.btnLeft.addEventListener('click', () => this.select(0));

    for (let elem of document.getElementsByClassName('adress-option__removed-radio')) {
      elem.addEventListener('change', (e) => this.toggleButtons(e));
    }
  }



  touchStart(e) {
    this.touchFrom = this.touchCurrent = e.changedTouches[0].clientX;
  }

  touchMove(event) {
    if (this.active) {
      const offset = parseInt(this.stack.style.marginLeft) + event.changedTouches[0].clientX - this.touchCurrent;

      if (offset <= this.maxOffset) this.stack.style.marginLeft = this.maxOffset + 'px';

      else if (offset >= 0) this.stack.style.marginLeft = '0px';

      else {
        this.stack.style.marginLeft = offset + 'px';
        this.touchCurrent = event.changedTouches[0].clientX;

        if (this.touchFrom - this.touchCurrent > this.limit) this.moveTo(this.currentSlide + 1);

        else if (this.touchFrom - this.touchCurrent < -this.limit) this.moveTo(this.currentSlide - 1);
      }
    }
  }

  touchEnd() {
    if (this.active) {
      this.moveTo(this.currentSlide, '0.1s');
      setTimeout(() => this.unlock(), 100);
    }
    this.touchFrom = this.touchCurrent = 0;
  }

  unlock() {
    this.stack.style.transition = '';
    this.active = true;
  }

  moveTo(slide, time = '0.5s') {
    this.active = false;
    this.currentSlide = slide;
    this.stack.style.transition = time;
    this.stack.style.marginLeft = this.slideWidth * slide + 'px';
    this.select(slide);
  }

  setSizes() {
    if (window.matchMedia('(max-width: 767px)').matches === false) {
      this.active = false;
      return
    }
    this.slideWidth = Math.round(this.container.offsetWidth * -88) / 100;
    this.slidesCount = this.stack.childElementCount - 1;
    this.maxOffset = this.slideWidth * this.slidesCount;

    this.limit = Math.round(this.container.offsetWidth * 0.125);
    if (this.limit > 80) this.limit = 80;

    this.touchFrom = this.touchCurrent = 0;
    this.stack.style.marginLeft = '0px';
    this.currentSlide = 0;
    this.active = true;
  }

  select(slide) {
    document.getElementsByClassName('adress-option__removed-radio')[slide].click();
  }

  toggleButtons(e) {
    if (e.target.id === 'a1') {
      this.btnLeft.disabled = true;
      this.btnRight.disabled = false;
    }
    else {
      this.btnLeft.disabled = false;
      this.btnRight.disabled = true;
    }
  }
}



let adressSwiper = new Swiper(
  document.getElementsByClassName('adress__swiper')[0],
  document.getElementsByClassName('adress__prev-btn')[0],
  document.getElementsByClassName('adress__next-btn')[0]
);

document.getElementsByClassName('cart__body')[0].addEventListener('submit', (e) => e.preventDefault());