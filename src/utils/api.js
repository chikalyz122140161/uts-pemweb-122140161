// Utils untuk memanggil OpenWeatherMap API
const BASE_GEOCODE = 'https://api.openweathermap.org/geo/1.0/direct'
const BASE_WEATHER = 'https://api.openweathermap.org/data/2.5/weather'
const BASE_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
if(!API_KEY){
  console.warn('VITE_OPENWEATHER_API_KEY is not set. Put your API key in .env.local')
}

export async function geocodeCity(q, lang='en'){
  // return array of results
  const url = `${BASE_GEOCODE}?q=${encodeURIComponent(q)}&limit=5&appid=${API_KEY}&lang=${lang}`
  const res = await fetch(url)
  if(!res.ok) throw new Error('Geocode failed')
  return res.json()
}

export async function fetchWeatherByCity(lat, lon, units='metric', lang='en'){
  const url = `${BASE_WEATHER}?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}&lang=${lang}`
  const res = await fetch(url)
  if(!res.ok) throw new Error('Weather fetch failed')
  return res.json()
}

export async function fetchForecastByCoords(lat, lon, units='metric', lang='en'){
  const url = `${BASE_FORECAST}?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}&lang=${lang}`
  const res = await fetch(url)
  if(!res.ok) throw new Error('Forecast fetch failed')
  const data = await res.json()
  // transform to daily-ish overview: choose one per day (every 12:00) or first of day
  const list = data.list || []
  // reduce to roughly 5 items by date
  const grouped = {}
  list.forEach(item=>{
    const date = new Date(item.dt*1000).toISOString().split('T')[0]
    if(!grouped[date]) grouped[date]=item
  })
  const result = Object.values(grouped).slice(0,5)
  return result
}
