import blogService from '../services/blogs'

export const fetchBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'SET_BLOGS',
            data: blogs
        })
    }
}

export const addBlog = (newBlog) => {
    return async dispatch => {
        const response = await blogService.create(newBlog)
        dispatch({
            type: 'NEW_BLOG',
            data: response.data
        })
    }
}

export const likeBlog = (id) => {
    return async dispatch => {
        const blogToModify = await blogService.getId(id)
        const modifiedBlog = {
            ...blogToModify,
            likes: blogToModify.likes + 1
        }
        const response = await blogService.update(modifiedBlog)
        dispatch ({
            type: 'LIKE_BLOG',
            data: response.data
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch ({
            type: 'REMOVE_BLOG',
            data: id
        })
    }
}

const blogsReducer = (state = [], action) => {
    switch (action.type) {
    case 'SET_BLOGS':
        return action.data
    case 'NEW_BLOG':
        return [...state, action.data]
    case 'LIKE_BLOG': {
        const likedBlog = state.find(obj => obj.id === action.data.id)
        return state.map(blog =>
            blog.id === action.data.id ? likedBlog : blog
        )
    }
    case 'REMOVE_BLOG': {
        return state.filter(blog => blog.id !== action.data)
    }
    default:
        return state
    }
}

export default blogsReducer
