import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(url)
    return response.data
}

const create = async data => {
    const response = await axios.post(url, data)
    return response.data
}


export default { getAll, create }