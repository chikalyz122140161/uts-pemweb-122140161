import React, { useState } from 'react'

// Form dengan minimal 5 input berbeda dan validasi HTML5
export default function SettingsForm({ settings, onChange, onClearHistory }){
  const [local, setLocal] = useState(settings)

  const handleSubmit = (e) =>{
    e.preventDefault()
    onChange(local)
  }

  return (
    <section className="card">
      <form onSubmit={handleSubmit}>
        <h3>Pengaturan</h3>

        <label>Alias Kota (text)</label>
        <input type="text" value={local.cityAlias} onChange={e=>setLocal({...local, cityAlias:e.target.value})} placeholder="Optional alias" />

        <label>Refresh Interval (detik) (number)</label>
        <input type="number" min="0" value={local.refreshInterval} onChange={e=>setLocal({...local, refreshInterval: Number(e.target.value)})} />

        <label>Gunakan Geolocation? (checkbox)</label>
        <input type="checkbox" checked={local.useGeolocation} onChange={e=>setLocal({...local, useGeolocation: e.target.checked})} />

        <div>
          <span>Default Unit (radio)</span>
          <label><input type="radio" name="unit" value="metric" checked={local.defaultUnit==='metric'} onChange={e=>setLocal({...local, defaultUnit: e.target.value})} /> Celsius</label>
          <label><input type="radio" name="unit" value="imperial" checked={local.defaultUnit==='imperial'} onChange={e=>setLocal({...local, defaultUnit: e.target.value})} /> Fahrenheit</label>
        </div>

        <label>Bahasa (select)</label>
        <select value={local.lang} onChange={e=>setLocal({...local, lang:e.target.value})}>
          <option value="en">English</option>
          <option value="id">Bahasa Indonesia</option>
        </select>

        <div style={{marginTop:12}}>
          <button type="submit">Simpan Pengaturan</button>
          <button type="button" style={{marginLeft:8}} onClick={onClearHistory}>Clear History</button>
        </div>
      </form>
    </section>
  )
}
