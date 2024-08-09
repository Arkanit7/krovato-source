export default function ac() {
  const accordions = [...document.querySelectorAll('[data-ac]')].reverse()
  let takenPanels = []

  const generateUniqueId = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let id = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      id += characters[randomIndex]
    }
    return id
  }

  /**
   * Description placeholder
   *
   * @param {HTMLElement} panel
   */
  function openPanel(panel) {
    const trigger = panel.querySelector('[data-ac-trigger]')
    const content = panel.querySelector('[data-ac-content]')

    content.removeAttribute('hidden')
    trigger.setAttribute('aria-expanded', 'true')
  }

  function openPanels(panels) {
    panels.forEach(openPanel)
  }

  /**
   * Description placeholder
   *
   * @param {HTMLElement} panel
   */
  function closePanel(panel) {
    const trigger = panel.querySelector('[data-ac-trigger]')
    const content = panel.querySelector('[data-ac-content]')

    content.setAttribute('hidden', '')
    trigger.removeAttribute('aria-expanded')
  }

  function closePanels(panels) {
    panels.forEach(closePanel)
  }

  /**
   * Description placeholder
   *
   * @param {Event} event
   */
  function handleClick(event, panel, panels, mode) {
    const aria = event.currentTarget.getAttribute('aria-expanded')
    const state = aria === 'true'

    if (mode === 'single') closePanels(panels)

    state ? closePanel(panel) : openPanel(panel)
  }

  function enablePanel(panel) {
    const trigger = panel.querySelector('[data-ac-trigger]')

    // const state = trigger.getAttribute('aria-expanded') === 'true'

    // state ? closePanel(panel) : openPanel(panel)

    trigger.removeAttribute('disabled')
    closePanel(panel)
  }

  function disablePanel(panel) {
    const trigger = panel.querySelector('[data-ac-trigger]')

    trigger.setAttribute('disabled', '')
    openPanel(panel)
  }

  function initPanels(panels, mode) {
    // Initialize panels
    panels.forEach((panel) => {
      const trigger = panel.querySelector('[data-ac-trigger]')
      const content = panel.querySelector('[data-ac-content]')

      const triggerId = `ac-${generateUniqueId(16)}`
      const contentId = `ac-${generateUniqueId(16)}`

      // A11y
      content.setAttribute('role', 'region')

      trigger.setAttribute('id', triggerId)
      content.setAttribute('id', contentId)

      trigger.setAttribute('aria-controls', contentId)
      content.setAttribute('aria-labelledby', triggerId)
      // End of A11y

      trigger.addEventListener('click', (event) =>
        handleClick(event, panel, panels, mode),
      )
    })
  }

  function enablePanels(panels) {
    // Initialize panels
    panels.forEach((panel) => {
      enablePanel(panel)
    })
  }

  function disablePanels(panels) {
    // Initialize panels
    panels.forEach((panel) => {
      disablePanel(panel)
    })
  }

  accordions.forEach((accordion) => {
    // Filter nested panels
    const panels = [...accordion.querySelectorAll('[data-ac-panel]')].filter(
      (panel) => !takenPanels.includes(panel),
    )
    // Add taken panels
    takenPanels = [...takenPanels, ...panels]

    const mode = accordion.getAttribute('data-ac-mode')

    initPanels(panels, mode)

    // Check for media
    const media = accordion.getAttribute('data-ac-media')

    if (!media) {
      enablePanels(panels)
      return
    }

    const mediaQuery = matchMedia(media)

    mediaQuery.matches && enablePanels(panels)
    mediaQuery.matches || disablePanels(panels)

    mediaQuery.addEventListener('change', () => {
      mediaQuery.matches && enablePanels(panels)
      mediaQuery.matches || disablePanels(panels)
    })
  })
}
