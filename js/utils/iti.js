import intlTelInput from 'intl-tel-input'

const inputs = document.querySelectorAll('[data-iti]')
inputs.forEach((input) => {
  intlTelInput(input, {
    i18n: {
      // Aria label for the selected country element
      selectedCountryAriaLabel: 'Обрана країна',
      // Screen reader text for when no country is selected
      noCountrySelected: 'Країну не вибрано',
      // Aria label for the country list element
      countryListAriaLabel: 'Перелік країн',
      // Placeholder for the search input in the dropdown
      searchPlaceholder: 'Пошук',
      // Screen reader text for when the search produces no results
      zeroSearchResults: 'Нічого не знайдено',
      // Screen reader text for when the search produces 1 result
      oneSearchResult: '1 результат знайдено',
      // Screen reader text for when the search produces multiple results, where ${count} will be replaced by the count
      multipleSearchResults: '${count} знайдено',
    },

    // look for user's country based on IP
    initialCountry: 'auto',
    geoIpLookup: (callback) => {
      fetch('https://ipapi.co/json')
        .then((res) => res.json())
        .then((data) => callback(data.country_code))
        .catch(() => callback('ua'))
    },

    // Validation (+ 260Kb)
    utilsScript:
      'https://cdn.jsdelivr.net/npm/intl-tel-input@23.6.0/build/js/utils.js',
    validationNumberType: 'MOBILE',
    strictMode: true,
    separateDialCode: true,

    // Misc
    excludeCountries: ['ru', 'by', 'kp', 'ir'],
    countryOrder: ['ua', 'pl', 'cz', 'md', 'sk', 'hu', 'ro'],
  })
})
