import { useState, useEffect } from 'react'
import axios from 'axios'

const useCountry = name => {
    const [result, setResult] = useState('')
    const [isBusy, setBusy] = useState(false)

    const url = `https://restcountries.eu/rest/v2/name/${name.toLowerCase()}?fullText=true`


    const fetchData = async () => {
        try {
            if (name !== '') {
                setBusy(true)
                const result = await axios.get(url)
                if (result) {
                    setResult({
                        data: result.data[0],
                        found: true
                    })
                    setBusy(false)
                }
            }
        } catch(err) {
            console.log(err)
            setResult({
                data: null,
                found: false
            })
            setBusy(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [name])

    return ({ result, isBusy })
}

export default useCountry