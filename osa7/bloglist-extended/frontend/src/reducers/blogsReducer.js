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

export const addBlog = newBlog => {
    return async dispatch => {
        const createdBlog = await blogService.create(newBlog)
        dispatch({
            type: 'NEW_BLOG',
            data: createdBlog
        })
    }
}

export const likeBlog = blog => {
    return async dispatch => {
        const modifiedBlog = {
            ...blog,
            user: blog.user.id,
            likes: blog.likes + 1
        }
        const response = await blogService.update(modifiedBlog)
        dispatch ({
            type: 'LIKE_BLOG',
            data: response
        })
    }
}

export const removeBlog = blog => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch ({
            type: 'REMOVE_BLOG',
            data: blog.id
        })
    }
}

export const addComment = (id, comment) => {
    return async dispatch => {
        const newComment = await blogService.addComment(id, comment)
        dispatch({
            type: 'ADD_COMMENT',
            data: {
                ...newComment,
                blogId: id
            }
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
        const updatedBlog = {
            ...likedBlog,
            likes: action.data.likes
        }
        const updatedState = state.map(blog =>
            blog.id === updatedBlog.id ? updatedBlog : blog
        )
        return updatedState
    }
    case 'REMOVE_BLOG': {
        return state.filter(blog => blog.id !== action.data)
    }
    case 'ADD_COMMENT': {
        const commentedBlog = state.find(blog => blog.id === action.data.blogId)
        const newComment = {
            comment: action.data.comment,
            id: action.data.id
        }
        const updatedBlog = {
            ...commentedBlog,
            comments: [
                ...commentedBlog.comments,
                newComment
            ]
        }
        const updatedState = state.map(blog => {
            blog.id === updatedBlog.id ? updatedBlog : blog
        })
        return(updatedState)
    }
    default:
        return state
    }
}

export default blogsReducer
