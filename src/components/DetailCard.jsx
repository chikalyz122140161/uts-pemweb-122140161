import React from 'react'
import { formatDate } from '../utils/helpers'

export default function DetailCard({ data, unit }){
  // data sesuai respons current weather OpenWeatherMap
  const tempUnit = unit === 'metric' ? '°C' : '°F'

  return (
    <section className="card detail-card">
      <h2>{data.name}, {data.sys?.country}</h2>
      <div className="detail-grid">
        <div>
          <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description} />
          <p style={{fontSize:24}}>{Math.round(data.main.temp)}{tempUnit}</p>
          <p>{data.weather[0].description}</p>
        </div>
        <div>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind: {data.wind.speed} {unit==='metric'?'m/s':'mph'}</p>
          <p>Sunrise: {formatDate(data.sys.sunrise*1000)}</p>
          <p>Sunset: {formatDate(data.sys.sunset*1000)}</p>
        </div>
      </div>
    </section>
  )
}
