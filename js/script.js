// @ts-check

// function setIcon(use, id) {
//   use.setAttribute('xlink:href', `img/icons/symbol-defs.svg#${id}`)
// }

// /**
//  * Make any element with [data-trigger] to
//  * toggle [aria-expanded="true"] on click.
//  */
// function makeTriggers() {
//   const attribute = 'aria-expanded'

//   document.addEventListener('click', (e) => {
//     const trigger = e.target.closest('[data-trigger]')

//     if (!trigger) return

//     const state = trigger.hasAttribute(attribute)

//     state
//       ? trigger.removeAttribute(attribute)
//       : trigger.setAttribute(attribute, true)
//   })
// }

// makeTriggers()

function lang() {
  const block = document.querySelector('.lang-header')
  if (!block) return

  const button = block.querySelector('.lang-header__trigger')
  if (!button) return

  const icon = button.querySelector('use')
  if (!icon) return

  function close() {
    button.removeAttribute('aria-expanded')
    // setIcon(icon, 'icon-arrow')
  }

  function open() {
    button.setAttribute('aria-expanded', true)
    // setIcon(icon, 'icon-x')
  }

  button.addEventListener('click', () => {
    const state = button.hasAttribute('aria-expanded')

    if (state) {
      close()
    } else {
      open()
    }
  })

  document.addEventListener('click', (e) => {
    const closest = e.target.closest('.lang-header')

    if (!closest) close()
  })
}

lang()

function phone() {
  const block = document.querySelector('.phone-header')

  if (!block) return

  const buttons = [
    block.querySelector('.phone-header__button'),
    block.querySelector('.phone-header__trigger'),
  ]

  function open() {
    buttons.forEach((button) => button.setAttribute('aria-expanded', true))
  }

  function close() {
    buttons.forEach((button) => button.removeAttribute('aria-expanded'))
  }

  document.addEventListener('click', (e) => {
    if (
      e.target.closest('.phone-header__button') ||
      e.target.closest('.phone-header__trigger')
    ) {
      const state = buttons.some((button) =>
        button.hasAttribute('aria-expanded'),
      )

      state ? close() : open()

      return
    }

    if (e.target.closest('.phone-header')) {
      return
    }

    close()
  })
}

phone()

function handleCatalogHeight() {
  const catalog = document.querySelector('.menu-catalog')

  if (!catalog) return

  function setCatalogHeight() {
    const { top } = catalog.getBoundingClientRect()
    const visibleHeight = window.innerHeight - top

    document.documentElement.style.setProperty(
      '--catalog-visible-height',
      `${visibleHeight - 10}px`,
    )
  }

  window.addEventListener('load', setCatalogHeight)
  window.addEventListener('resize', setCatalogHeight)
}

handleCatalogHeight()

function search() {
  const button = document.querySelector('.search-header__trigger')
  const form = document.querySelector('.search-header__form')
  const input = document.querySelector('.search-header__input')

  if (!button) return

  form?.addEventListener('transitionstart', () => {
    button.hasAttribute('aria-expanded') && input?.focus()
  })

  button.addEventListener('click', () => {
    const state = button.hasAttribute('aria-expanded')

    if (state) {
      button.removeAttribute('aria-expanded')
    } else {
      button.setAttribute('aria-expanded', 'true')
    }
  })

  document.addEventListener('click', (e) => {
    const closest = e.target.closest('.search-header')

    if (!closest) {
      button.removeAttribute('aria-expanded')
    }
  })
}

search()

function menu() {
  const overlay = document.querySelector('.header__overlay')
  if (!overlay) return

  const burger = document.querySelector('.burger')
  if (!burger) return

  const menuElement = document.getElementById(
    burger.getAttribute('aria-controls'),
  )
  if (!menuElement) return

  const { body } = document

  function openMenu() {
    burger.setAttribute('aria-expanded', 'true')
    menuElement.classList.add('menu--active')
    overlay.classList.add('overlay--active')
    body.classList.add('menu-lock')
  }

  function closeMenu() {
    burger.setAttribute('aria-expanded', 'false')
    menuElement.classList.remove('menu--active')
    overlay.classList.remove('overlay--active')
    body.classList.remove('menu-lock')
  }

  window.addEventListener('click', (e) => {
    if (e.target.closest('.menu')) return
    const expanded = burger.getAttribute('aria-expanded') === 'true'

    if (expanded) {
      closeMenu()
      return
    }
    if (e.target.closest('.burger')) openMenu()
  })
}

menu()

function cartPopup() {
  const trigger = document.querySelector('[data-cart-header]')
  const popup = document.querySelector('.cart-header')
  const overlay = document.querySelector('.header__overlay')

  if (!popup || !trigger || !overlay) return

  function open() {
    trigger.setAttribute('aria-expanded', 'true')
    overlay.classList.add('overlay--cart')
    document.body.classList.toggle('cart-lock', true)
  }

  function close() {
    trigger.removeAttribute('aria-expanded')
    overlay.classList.remove('overlay--cart')
    document.body.classList.toggle('cart-lock', false)
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-cart-header]')) {
      const state = trigger.hasAttribute('aria-expanded')

      state ? close() : open()
      return
    }

    if (
      e.target.closest('.cart-header__close') ||
      e.target.closest('.cart-header__resume')
    ) {
      close()
      return
    }

    if (e.target.closest('.cart-header')) return

    close()
  })
}

cartPopup()

function itemCart() {
  const cart = document.querySelector('.cart-header')

  function updateTotal() {
    const dispaly = cart.querySelector('.cart-header__title span')
    const inputs = [...cart.querySelectorAll('.calc__quantity')]

    const total = inputs.reduce(
      (total, input) => (total += parseInt(input.value)),
      0,
    )

    dispaly.innerText = total
  }

  updateTotal()

  window.addEventListener('click', (e) => {
    if (e.target.closest('.calc__decrease')) {
      const item = e.target.parentElement
      const input = item.querySelector('.calc__quantity')
      const value = parseInt(input.value)

      if (input.value <= 1) return

      input.value = value - 1
      updateTotal()
    }
  })

  window.addEventListener('click', (e) => {
    if (e.target.closest('.calc__increase')) {
      const item = e.target.parentElement
      const input = item.querySelector('.calc__quantity')
      const value = parseInt(input.value)

      input.value = value + 1
      updateTotal()
    }
  })
}

itemCart()

function showHide() {
  const containers = document.querySelectorAll('[data-show]')

  containers.forEach((container) => {
    const button = container.querySelector('[data-show-button]')

    button?.addEventListener('click', () => {
      const isShown = container.dataset.show === 'true'
      container.dataset.show = !isShown
    })
  })
}

showHide()

const generateUniqueId = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    id += characters[randomIndex]
  }
  return id
}

/** Bind input with label within [data-input-group] */
function inputGroup() {
  const inputGroups = document.querySelectorAll('[data-input-group]')

  inputGroups.forEach((group) => {
    const label = group.querySelector('label')
    const input = group.querySelector('input')

    if (!label || !input) return

    const randomId = generateUniqueId(15)
    input.setAttribute('id', `ig-${randomId}`)
    label.setAttribute('for', `ig-${randomId}`)
  })
}

inputGroup()

function makeHeaderHeightProperty() {
  function setProperty(height) {
    document.documentElement.style.setProperty('--header-height', `${height}px`)
  }

  const header = document.querySelector('.header')

  if (!header) return

  const observer = new ResizeObserver((entries) => {
    const entry = entries[0]
    setProperty(entry.contentRect.height)
  })

  observer.observe(header)
}

makeHeaderHeightProperty()

// ==================================================

/**
 * Description placeholder
 *
 * @param {HTMLElement} tableElement
 */
function parseTable(tableElement) {
  const tables = []
  const [head, ...rows] = tableElement.querySelectorAll('.table__row')
  const columns = head.children.length

  for (let i = 1; i < columns; i++) {
    const table = []

    rows.forEach((row) => {
      const children = [...row.children].map((child) => child.textContent)
      const pair = { key: children[0], value: children[i] }

      table.push(pair)
    })

    tables.push({ head: head.children[i].textContent, table })
  }

  return tables
}

function constructTable(tableObject) {
  let body = ` <section class="tables__section" data-generated>
              <h3 class="tables__subtitle">${tableObject.head}</h2>
              <table class="tables__table table">
                <tbody class="tables__group">`

  tableObject.table.forEach((row) => {
    let oneRow = `<tr class="table__row">`

    oneRow += `<td class="table__cell"><span>${row.key}</span></td>`
    oneRow += `<td class="table__cell"><span>${row.value}</span></td>`
    oneRow += `</tr>`

    body += oneRow
  })

  body += `     </tbody>           
              </table>
            </section>`

  return body
}

function transmuteTable() {
  const tables = document.querySelectorAll('.table')
  const multiColumnTables = [...tables].filter(
    (table) => table.querySelector('.table__row').children.length > 2,
  )

  multiColumnTables.forEach((table) => {
    const tablesObject = parseTable(table)

    tablesObject.reverse().forEach((tableObject) => {
      const html = constructTable(tableObject)

      table.insertAdjacentHTML('afterend', html)
    })
  })

  const media = matchMedia('(36em <= width)')

  function revile() {
    if (media.matches) {
      document
        .querySelectorAll('[data-generated]')
        .forEach((el) => (el.style.display = 'none'))

      multiColumnTables.forEach((el) => el.style.removeProperty('display'))
    } else {
      document
        .querySelectorAll('[data-generated]')
        .forEach((el) => el.style.removeProperty('display'))
      multiColumnTables.forEach((el) => (el.style.display = 'none'))
    }
  }

  revile()
  media.addEventListener('change', revile)
}

transmuteTable()
