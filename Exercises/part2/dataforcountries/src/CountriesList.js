import React, { useEffect, useState } from 'react'
import uniqid from 'uniqid';
import axios from 'axios';

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const api_key = process.env.REACT_APP_API_KEY

export default function CountriesList({ countries }) {

  const [temperature, setTemperature] = useState(null)


  useEffect(() => {
    if (countries.length === 1) {
      
      axios
        .get(`${weatherUrl}q=${countries[0].name.common}&appid=${api_key}&units=metric `)
        .then(response => {
        setTemperature(response.data)
        })
    }
  }, [countries])


  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } 
  if (countries.length === 1) {
    return (
      <div>
          <p><strong>{countries[0].name.common}</strong></p>
          <p>capital {countries[0].capital}</p>
          <p>area {countries[0].area}</p>
          <p><strong>languages</strong></p>
          <ul>
            {
              countries[0].languages ? 
              Object.values(countries[0].languages).map(lang => <li key={uniqid()}>{lang}</li>) : <li>NO INFO AVAILABLE</li>
            }
          </ul>
        <img src={countries[0].flags.png} alt={`flag from ${countries[0].name.common}`} />
        {temperature && <div>
          <p><strong>Weather in {countries[0].name.common}</strong></p>
          <p>temperature {temperature.main.temp} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${temperature.weather[0].icon}@2x.png`} alt="temperature icon" />
          <p>wind {temperature.wind.speed} m/s</p>
        </div>}
      </div>
    )
  }

  return (
    <>
      {countries.map(c =>
 
        <div key={uniqid()}>
          <p >{c.name.common}</p>
      </div>)}
    </>
  )
}
