import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
    return {
        headers: { Authorization: `bearer ${storage.loadUser().token}` }
    }
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getId = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const create = async (blog) => {
    console.log(blog)
    const response = await axios.post(baseUrl, blog, getConfig())
    console.log(response)
    return response.data
}

const update = (blog) => {
    const request = axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`, getConfig())
    return request.then(response => response.data)
}

export default { getAll, create, update, remove, getId }