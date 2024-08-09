;((g) => {
  let h
  let a
  let k
  const p = 'The Google Maps JavaScript API'
  const c = 'google'
  const l = 'importLibrary'
  const q = '__ib__'
  const m = document
  let b = window
  b = b[c] || (b[c] = {})
  const d = b.maps || (b.maps = {})
  const r = new Set()
  const e = new URLSearchParams()
  const u = () =>
    h ||
    (h = new Promise(async (f, n) => {
      await (a = m.createElement('script'))
      e.set('libraries', `${[...r]}`)
      for (k in g)
        e.set(
          k.replace(/[A-Z]/g, (t) => `_${t[0].toLowerCase()}`),
          g[k],
        )
      e.set('callback', `${c}.maps.${q}`)
      a.src = `https://maps.${c}apis.com/maps/api/js?${e}`
      d[q] = f
      a.onerror = () => (h = n(Error(`${p} could not load.`)))
      a.nonce = m.querySelector('script[nonce]')?.nonce || ''
      m.head.append(a)
    }))
  d[l]
    ? console.warn(`${p} only loads once. Ignoring:`, g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)))
})({
  key: 'AIzaSyBPNXTcUcJ8CVnjEp--CkVmt9hb3hbCpBE',
  v: 'weekly',
  // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
  // Add other bootstrap parameters as needed, using camel case.
})

// Initialize and add the map
let map = document.getElementById('map')

async function initMap() {
  // The location of Krovato
  const position = { lat: 50.39600917746538, lng: 30.423787277729964 }
  // Request needed libraries.
  // @ts-ignore
  const { Map, InfoWindow } = await google.maps.importLibrary('maps')
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')

  // The map, centered at Krovato
  map = new Map(document.getElementById('map'), {
    zoom: 18,
    center: position,
    mapId: 'DEMO_MAP_ID',
  })

  const infoWindow = new InfoWindow({
    ariaLabel: `Krovato`,
    content: `<p><b>Krovato</b> — коли потрібні якісні меблі за доступною ціною!</p>
    <p><i>м. Київ, провулок Ізяславський 52, пов. 2</i></p>
    <p>
      <a href="https://maps.google.com/maps/dir//%D0%9A%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D0%BE+Iziaslavskyi+Ln,+52+Kyiv+03169/@50.3960037,30.4237898,17z/data=!4m5!4m4!1m0!1m2!1m1!1s0x40d4c985b50a7e6d:0x3d3fa41b01332a2a" target="_blank" style="color: #1b77e4;">Маршрут</a> | 
      <a href="https://maps.app.goo.gl/44BiDna2z6M7mgC19" target="_blank" style="color: #1b77e4;">Локація на мапі</a>
    </p>`,
  })
  const pinImage = document.createElement('img')
  pinImage.src = '../img/contacts/marker.svg'

  // The marker, positioned at Krovato
  const marker = new AdvancedMarkerElement({
    map,
    position,
    title: 'Krovato',
    content: pinImage,
  })

  // Add a click listener for each marker, and set up the info window.
  marker.addListener('click', ({ domEvent, latLng }) => {
    const { target } = domEvent

    infoWindow.close()
    infoWindow.open(marker.map, marker)
  })
}

map && initMap()
