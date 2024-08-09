import noUiSlider from 'nouislider'

function pricesFilter() {
  // 1. Filter element selection (early return for efficiency)
  const filter = document.querySelector('.prices-filter')
  if (!filter) return

  const fields = filter.querySelectorAll('.prices-filter__field')
  if (!fields.length) return // Check for existence and length

  // 2. Input field references
  const [minInput, maxInput] = fields
  if (!minInput || !maxInput) return // Early return for missing fields

  // 3. Slider element selection
  const slider = filter.querySelector('.prices-filter__slider')
  if (!slider) return

  // 4. noUiSlider configuration
  noUiSlider.create(slider, {
    start: [4000, 16000], // Initial slider positions
    range: {
      min: 0,
      max: 20000,
    },
    connect: true,
    margin: 500,
  })

  // 5. Update input values based on slider change
  function setInputs([minValue, maxValue]) {
    minInput.value = Math.floor(minValue) // Use Math.floor for integer values
    maxInput.value = Math.floor(maxValue)
  }

  slider.noUiSlider.on('update', setInputs)

  // 6. Update slider handle based on input changes
  fields.forEach((field, index) => {
    field.addEventListener('change', () => {
      const value = parseInt(field.value) // Parse value as integer
      if (Number.isNaN(value)) return // Early return if parsing fails (not a number)
      slider.noUiSlider.setHandle(index, value)
    })
  })
}

pricesFilter()
