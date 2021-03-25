import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [newSearch, setSearch] = useState('')
  const [countryData, setCountryData] = useState([])
  const [searchResults, setSearchResults] = useState([])
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountryData(response.data))
  }, [])


  const handleSearchField = event => {
    setSearch(event.target.value)
    setSearchResults(countryData.filter(country => country.name.toLowerCase().includes(newSearch)))
  }


  return (
    <div>
      Find countries: <input value={newSearch} onChange={handleSearchField}/>
        {
        searchResults.length > 10 || searchResults.length === 0
        ? <p>Too many or no results, please change your filter</p>
        : searchResults.length > 1 
          ? <CountryList countries={searchResults} />
          : <CountryInfo country={searchResults[0]} />
        }
    </div>
  )

}

const CountryList = (props) => {
  return (
    <div>
      {props.countries.map(country => <p key={country.name}>{country.name}</p>)}
    </div>
  )
}

const CountryInfo = (props) => {
  return (
    <div>
      <h2>{props.country.name}</h2>
      <p>Capital: {props.country.capital}</p>
      <p>Languages:</p>
      <LangList langs={props.country.languages} />
      <img src={props.country.flag} alt='' style={{maxWidth: '25%', maxHeight: '25%'}} />
    </div>
  )
}

const LangList = (props) => {
  return (
  <ul>
    {props.langs.map(language => <li key={language.name}>{language.name}</li>)}
  </ul>
  )

}


export default App;
