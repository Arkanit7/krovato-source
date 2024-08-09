const CATALOG_SELECTOR = '[data-catalog]'
const TRIGGER_SELECTOR = '[data-catalog-trigger]'
const PANEL_SELECTOR = '[data-catalog-panel]'

function catalogAccordion() {
  const closePanel = (panel) => {
    const trigger = panel.querySelector(TRIGGER_SELECTOR)
    const content = panel.querySelector(
      `#${trigger.getAttribute('aria-controls')}`,
    )

    trigger.setAttribute('aria-expanded', false)
    content.classList.remove('submenu-catalog--active')
    content.classList.remove('menu-catalog__submenu-catalog--active')
  }

  const openPanel = (panel) => {
    const trigger = panel.querySelector(TRIGGER_SELECTOR)
    const content = panel.querySelector(
      `#${trigger.getAttribute('aria-controls')}`,
    )

    trigger.setAttribute('aria-expanded', true)
    content.classList.add('submenu-catalog--active')
    content.classList.add('menu-catalog__submenu-catalog--active')
  }

  const initializePanel = (panel, panels, isSingle) => {
    const trigger = panel.querySelector(TRIGGER_SELECTOR)
    closePanel(panel)

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true'

      if (isSingle) panels.forEach(closePanel)
      isExpanded ? closePanel(panel) : openPanel(panel)
    })
  }
  const enablePanel = (panel) => {
    const trigger = panel.querySelector(TRIGGER_SELECTOR)

    trigger.disabled = false
  }
  const disablePanel = (panel) => {
    const trigger = panel.querySelector(TRIGGER_SELECTOR)

    trigger.disabled = true
  }

  const catalogs = document.querySelectorAll(CATALOG_SELECTOR)

  catalogs.forEach((instance) => {
    const params = instance.dataset.catalog.replace(/\s*;\s*/g, ';').split(';')
    const single = params.includes('single')
    const media = single ? params.filter((el) => el !== 'single')[0] : params[0]

    function shouldBeEnabled(mediaQuery, panels) {
      if (mediaQuery.matches) {
        panels.forEach((panel) => {
          closePanel(panel)
          enablePanel(panel)
        })
      } else {
        panels.forEach((panel) => {
          disablePanel(panel)
          openPanel(panel)
        })
      }
    }

    const panels = instance.querySelectorAll(PANEL_SELECTOR)

    panels.forEach((panel, index, array) => {
      initializePanel(panel, array, single)
    })

    if (media) {
      const mediaQuery = matchMedia(media)

      shouldBeEnabled(mediaQuery, panels)

      mediaQuery.addEventListener('change', () => {
        shouldBeEnabled(mediaQuery, panels)
      })
    } else {
      panels.forEach((panel) => {
        enablePanel(panel)
      })
    }
  })
}

catalogAccordion()

function catalogToggle() {
  const catalogButton = document.querySelector('.catalog__button')
  const overlay = document.querySelector('[data-catalog-overlay]')

  if (catalogButton == null || overlay == null) return

  function open() {
    catalogButton.setAttribute('aria-expanded', 'true')
    overlay.classList.add('overlay--visible')
    document.body.classList.add('catalog-lock')
  }

  function close() {
    catalogButton.removeAttribute('aria-expanded')
    overlay.classList.remove('overlay--visible')
    document.body.classList.remove('catalog-lock')
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('.catalog__button')) {
      const state = catalogButton.hasAttribute('aria-expanded')

      state ? close() : open()

      return
    }

    if (!e.target.closest('.menu-catalog__list')) close()
  })
}

catalogToggle()
