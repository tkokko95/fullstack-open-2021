import { useState } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)

    }

    const create = async (data) => {
        const response = await axios.post(baseUrl, data)
        setResources([...resources, response.data])
    }

    const resourceService = {getAll, create}

    return [resources, resourceService]
}

export default useResource


