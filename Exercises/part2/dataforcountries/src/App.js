import React, { useEffect, useState } from "react";
import axios from "axios";
import CountriesList from "./CountriesList";


const baseUrl = 'https://restcountries.com/v3.1/all'

function App() {
  const [country, setCountry] = useState(''); 
  const [countries, setCountries] = useState([])

  function onHandleChange(e) {
    setCountry(e.target.value); 
  }
  

  useEffect(() => {
    const controller = new AbortController();
    if (country) {
      axios
        .get(baseUrl, { signal: controller.signal })
        .then(response => setCountries(response.data.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()))))
        .catch(err => err.name !== "CanceledError" && console.log('error:', err))
    } else {
 
      setCountries([])
    }

    return () => {
      controller.abort()
    }

  }, [country])

  return (
    <>
      <div><span>find countries</span>
        <input type="text" value={country} onChange={onHandleChange} />
        <CountriesList countries={countries} />
      </div>
    </>
  )
}

export default App;
