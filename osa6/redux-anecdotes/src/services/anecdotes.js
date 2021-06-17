import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getId = async id => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const create = async data => {
    const response = await axios.post(baseUrl, data)
    return response.data
}

const like = async id => {
    const toChange = await getId(id)
    const newVotes = toChange.votes + 1
    console.log(id)

    const response = await axios.put(`${baseUrl}/${id}`, {
        ...toChange,
        votes: newVotes
    })
    return response.data

    


}


export default { getAll, create, like }