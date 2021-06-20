import React, { useState } from 'react'
import useCountry from './hooks/useCountry'

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

const Country = ({ country }) => {
    if (!country) {
        return null
    }

    if (!country.found) {
        return (
            <div>
                not found...
            </div>
        )
    }

    return (
        <div>
            <h3>{country.data.name} </h3>
            <div>capital {country.data.capital} </div>
            <div>population {country.data.population}</div>
            <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
        </div>
    )
}

const App = () => {
    const nameInput = useField('text')
    const [name, setName] = useState('')
    const country = useCountry(name)

    const fetch = (e) => {
        e.preventDefault()
        setName(nameInput.value)
    }

    return (
        <div>
            <form onSubmit={fetch}>
                <input {...nameInput} />
                <button type='submit'>find</button>
            </form>

            {country.isBusy ? <h3>Searching...</h3> : <Country country={country.result} />}
        </div>
    )
}

export default App