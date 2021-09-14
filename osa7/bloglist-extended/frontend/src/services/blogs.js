import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
    return {
        headers: { Authorization: `bearer ${storage.loadUser().token}` }
    }
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async blog => {
    const response = await axios.post(baseUrl, blog, getConfig())
    return response.data
}

const update = async blog => {
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
    return response.data
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`, getConfig())
    return request.then(response => response.data)
}

const addComment = async (id, comment) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, getConfig())
    return response.data
}
export default { getAll, create, update, remove, addComment }