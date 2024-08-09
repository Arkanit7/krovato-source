export default class Overlay {
  static overlay = document.querySelector('.overlay')

  static show() {
    this.overlay.classList.add('overlay_active')
  }

  static hide() {
    this.overlay.classList.remove('overlay_active')
  }
}
