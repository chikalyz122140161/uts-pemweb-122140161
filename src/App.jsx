import React, { useEffect, useState, useCallback } from 'react'
import Header from './components/Header'
import SearchForm from './components/SearchForm'
import DataTable from './components/DataTable'
import DetailCard from './components/DetailCard'
import SettingsForm from './components/SettingsForm'
import { fetchWeatherByCity, fetchForecastByCoords, geocodeCity } from './utils/api'
import { formatDate } from './utils/helpers'

// Komentar/Doc dalam Bahasa Indonesia: 
// App utama mengorkestrasi semua komponen. State utama:
// - unit: 'metric' atau 'imperial'
// - current: data cuaca saat ini
// - forecast: array data ramalan
// - history: array nama kota yang tersimpan di localStorage
// - settings: pengaturan tambahan (refreshInterval dll)

export default function App(){
  const [unit, setUnit] = useState('metric')
  const [lang, setLang] = useState('en')
  const [current, setCurrent] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState(() => {
    try{
      const raw = localStorage.getItem('weather_history')
      return raw ? JSON.parse(raw) : []
    }catch(e){
      return []
    }
  })
  const [settings, setSettings] = useState(() => ({
    refreshInterval: 0,
    useGeolocation: false,
    defaultUnit: 'metric',
    cityAlias: ''
  }))

  // Simpan history setiap ada perubahan
  useEffect(()=>{
    localStorage.setItem('weather_history', JSON.stringify(history))
  }, [history])

  // Jika pengguna memilih defaultUnit di settings, sinkronkan
  useEffect(()=>{
    setUnit(settings.defaultUnit)
  }, [settings.defaultUnit])

  const handleSearch = useCallback(async (cityName) => {
    setLoading(true)
    setError(null)
    try{
      // Geocoding: dapatkan koordinat untuk nama kota
      const geo = await geocodeCity(cityName, lang)
      if(!geo || geo.length === 0) throw new Error('City not found')
      const { lat, lon, name } = geo[0]

      const currentData = await fetchWeatherByCity(lat, lon, unit, lang)
      const forecastData = await fetchForecastByCoords(lat, lon, unit, lang)

      setCurrent(currentData)
      setForecast(forecastData)

      // update history, unik, terakhir di depan
      setHistory(prev => {
        const filtered = prev.filter(c=>c.toLowerCase() !== name.toLowerCase())
        return [name, ...filtered].slice(0, 10)
      })
    }catch(err){
      console.error(err)
      setError(err.message || 'Error fetching data')
      setCurrent(null)
      setForecast([])
    }finally{
      setLoading(false)
    }
  }, [unit, lang])

  const handleUnitToggle = (newUnit) => {
    setUnit(newUnit)
  }

  const handleSettingsChange = (newSettings) => {
    setSettings(prev=>({ ...prev, ...newSettings }))
  }

  const handleClearHistory = () => {
    setHistory([])
  }

  return (
    <div className="app-root">
      <Header />
      <main className="container">
        <div className="left">
          <SearchForm
            onSearch={handleSearch}
            history={history}
            onHistoryClick={handleSearch}
            loading={loading}
            unit={unit}
            lang={lang}
            setLang={setLang}
            />

          <SettingsForm settings={settings} onChange={handleSettingsChange} onClearHistory={handleClearHistory} />
        </div>

        <div className="right">
          <div className="controls">
            <label className="unit-toggle">Unit:
              <button className={unit==='metric' ? 'active' : ''} onClick={()=>handleUnitToggle('metric')}>Celsius</button>
              <button className={unit==='imperial' ? 'active' : ''} onClick={()=>handleUnitToggle('imperial')}>Fahrenheit</button>
            </label>
          </div>

          {error && <div className="error">Error: {error}</div>}
          {loading && <div className="loader">Loading...</div>}

          {current && <DetailCard data={current} unit={unit} />}

          {forecast && forecast.length>0 && (
            <DataTable data={forecast} unit={unit} />
          )}

        </div>
      </main>

      <footer className="footer">
        <p>UTS - Pengembangan Aplikasi Web | Weather Dashboard</p>
      </footer>
    </div>
  )
}
