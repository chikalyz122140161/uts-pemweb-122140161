import React, { useState, useEffect } from 'react'
import { geocodeCity } from '../utils/api'

// Form pencarian dengan autocomplete suggestion. Menggunakan HTML5 validation.
export default function SearchForm({ onSearch, history, onHistoryClick, loading, unit, lang, setLang }){
  const [city, setCity] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(()=>{
    if(city.length < 2) { setSuggestions([]); return }
    let cancelled = false
    const fetchSuggestions = async ()=>{
      try{
        const results = await geocodeCity(city, lang)
        if(!cancelled) setSuggestions(results.slice(0,6))
      }catch(e){
        // ignore suggestions error
      }
    }
    fetchSuggestions()
    return ()=>{ cancelled=true }
  }, [city, lang])

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!city) return
    onSearch(city)
    setShowSuggestions(false)
  }

  return (
    <section className="card">
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">Cari Kota</label>
        <div className="input-row">
          <input id="city" name="city" type="text" value={city} onChange={e=>setCity(e.target.value)} placeholder="e.g. Jakarta" required minLength={2} aria-label="city" autoComplete="off" onFocus={()=>setShowSuggestions(true)} />
          <button type="submit" disabled={loading}>Search</button>
        </div>

        {showSuggestions && suggestions && suggestions.length>0 && (
          <ul className="suggestions" style={{marginTop:8}}>
            {suggestions.map((s, idx)=> (
              <li key={idx} style={{cursor:'pointer'}} onClick={()=>{ setCity(s.name); setShowSuggestions(false); onSearch(s.name) }}>{s.name} {s.state?`(${s.state})`:''} {s.country}</li>
            ))}
          </ul>
        )}

        <div style={{marginTop:12}}>
          <label>Language: </label>
          <select value={lang} onChange={e=>setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
          </select>
        </div>

        {history && history.length>0 && (
          <div style={{marginTop:12}}>
            <h4>History</h4>
            <ol>
              {history.map((h, i)=> (
                <li key={i}><button type="button" onClick={()=>onHistoryClick(h)}>{h}</button></li>
              ))}
            </ol>
          </div>
        )}
      </form>
    </section>
  )
}
