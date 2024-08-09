import Swiper from 'swiper'
import {
  Keyboard,
  A11y,
  Navigation,
  Pagination,
  FreeMode,
  Scrollbar,
  Thumbs,
} from 'swiper/modules'

const heroSlider = new Swiper('.slider-hero__swiper', {
  modules: [Keyboard, A11y, Navigation, Pagination],

  slidesPerView: 1,
  spaceBetween: '32px',
  speed: 800,
  navigation: {
    prevEl: '.slider-hero__button.button-slider--prev',
    nextEl: '.slider-hero__button.button-slider--next',
    //   // disabledClass: 'slider__nav--disabled',
  },
  keyboard: {
    onlyInViewport: true,
    pageUpDown: true,
  },
  pagination: {
    el: '.slider-hero__pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: 'bullet',
    bulletActiveClass: 'bullet--active',
  },
})

const promoSlider = new Swiper('.slider-promo__swiper', {
  modules: [Keyboard, A11y, Navigation, Pagination],

  slidesPerView: 1.2,
  spaceBetween: '16px',
  speed: 800,
  navigation: {
    prevEl: '.promo__button.button-slider--prev',
    nextEl: '.promo__button.button-slider--next',
    //   // disabledClass: 'slider__nav--disabled',
  },
  keyboard: {
    onlyInViewport: true,
    pageUpDown: true,
  },
  pagination: {
    el: '.slider-promo__pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: 'bullet bullet--border',
    bulletActiveClass: 'bullet--active',
  },
  breakpoints: {
    580: {
      slidesPerView: 2,
      spaceBetween: '20px',
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: '30px',
    },
  },
})

const newsSlider = new Swiper('.news__swiper', {
  modules: [Keyboard, A11y, Navigation],

  // autoHeight: true,
  slidesPerView: 1,
  spaceBetween: '20px',
  speed: 800,
  navigation: {
    prevEl: '.news__button.button-slider--prev',
    nextEl: '.news__button.button-slider--next',
    //   // disabledClass: 'slider__nav--disabled',
  },
  keyboard: {
    onlyInViewport: true,
    pageUpDown: true,
  },
  breakpoints: {
    680: {
      slidesPerView: 2,
      spaceBetween: '30px',
    },
    1100: {
      slidesPerView: 3,
    },
  },
})

const reviewsSlider = new Swiper('.slider-reviews__swiper', {
  modules: [Keyboard, A11y, Navigation, FreeMode, Scrollbar],

  // autoHeight: true,
  freeMode: true,
  slidesPerView: 1,
  spaceBetween: '12px',
  speed: 800,
  scrollbar: {
    el: '.slider-reviews__scrollbar',
    dragClass: 'scrollbar-slider__thumb',
    draggable: true,
    dragSize: 60,
  },
  keyboard: {
    onlyInViewport: true,
    pageUpDown: true,
  },
  breakpoints: {
    500: {
      slidesPerView: 'auto',
      spaceBetween: '20px',
    },
    992: {
      slidesPerView: 'auto',
      spaceBetween: '30px',
    },
  },
})

const thumbsSlider = new Swiper('.thumbs-product__swiper', {
  modules: [A11y, FreeMode],

  freeMode: true,
  watchSlidesProgress: true,
  createElements: true,
  resizeObserver: true,
  centerInsufficientSlides: true,
  slidesPerView: 'auto',
  spaceBetween: '12px',
  speed: 800,
  breakpoints: {
    480: {
      slidesPerView: 'auto',
      spaceBetween: '16px',
    },
    992: {
      slidesPerView: 'auto',
      spaceBetween: '20px',
    },
  },
})

const productSlider = new Swiper('.slider-product__swiper', {
  modules: [Keyboard, A11y, Navigation, Thumbs],

  createElements: true,
  watchOverflow: true,
  resizeObserver: true,
  autoHeight: true,
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: '12px',
  speed: 800,
  navigation: {
    prevEl: '.slider-product__button.button-slider--prev',
    nextEl: '.slider-product__button.button-slider--next',
  },
  keyboard: {
    onlyInViewport: true,
    pageUpDown: true,
  },
  thumbs: {
    swiper: thumbsSlider,
  },
  breakpoints: {
    480: {
      slidesPerView: 'auto',
      spaceBetween: '16px',
    },
    992: {
      slidesPerView: 'auto',
      spaceBetween: '20px',
    },
  },
})
