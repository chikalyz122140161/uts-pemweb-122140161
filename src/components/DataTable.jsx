import React from 'react'
import { formatDate } from '../utils/helpers'

// Table ramalan 5 hari. Ambil data list (dari endpoint /forecast) dan transformasi
export default function DataTable({ data, unit }){
  const tempUnit = unit === 'metric' ? '°C' : '°F'

  return (
    <section className="card">
      <h3>5-Day Forecast (Overview)</h3>
      <table className="table" aria-label="forecast table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp</th>
            <th>Weather</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx)=> (
            <tr key={idx}>
              <td>{formatDate(row.dt*1000)}</td>
              <td>{Math.round(row.main.temp)}{tempUnit}</td>
              <td>
                <img src={`https://openweathermap.org/img/wn/${row.weather[0].icon}.png`} alt="icon" /> {row.weather[0].description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
