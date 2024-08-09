import Overlay from './overlay.js'

export default function menu() {
  const burger = document.querySelector('.burger')
  const menuElement = document.getElementById(
    burger.getAttribute('aria-controls'),
  )
  const { body } = document

  function openMenu() {
    burger.setAttribute('aria-expanded', true)
    menuElement.classList.add('menu_active')
    Overlay.show()
    body.classList.add('menu-lock')
  }

  function closeMenu() {
    burger.setAttribute('aria-expanded', false)
    menuElement.classList.remove('menu_active')
    Overlay.hide()
    body.classList.remove('menu-lock')
  }

  window.addEventListener('click', (e) => {
    if (e.target.closest('.menu') && !e.target.closest('.header__link')) return
    const expanded = burger.getAttribute('aria-expanded') === 'true'

    if (expanded) {
      closeMenu()
      return
    }
    if (e.target.closest('.burger')) openMenu()
  })

  // // Eyebrow
  // const header = document.querySelector('header.header')
  // const firstPixel = document.querySelector('.first-pixel')

  // const observer = new IntersectionObserver((entries) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       header.classList.remove('header_eyebrow')
  //     } else {
  //       header.classList.add('header_eyebrow')
  //     }
  //   })
  // })

  // observer.observe(firstPixel);

  // ********* SUBMENU ************
  // const subMenuTriggers = document.querySelectorAll('.sub-menu__trigger');
  // if (!subMenuTriggers) return;

  // function closeSubMenu(trigger) {
  //   trigger.setAttribute('aria-expanded', false);
  //   const content = document.getElementById(
  //     trigger.getAttribute('aria-controls')
  //   );
  //   content.classList.remove('sub-menu__content_active');
  // }
  // function openSubMenu(trigger) {
  //   trigger.setAttribute('aria-expanded', true);
  //   const content = document.getElementById(
  //     trigger.getAttribute('aria-controls')
  //   );
  //   content.classList.add('sub-menu__content_active');
  // }

  // window.addEventListener('click', (e) => {
  //   const trigger = e.target.closest('.sub-menu__trigger');
  //   const expanded = trigger?.getAttribute('aria-expanded') === 'true';

  //   subMenuTriggers.forEach(closeSubMenu);
  //   if (trigger && !expanded) openSubMenu(trigger);
  // });
}
