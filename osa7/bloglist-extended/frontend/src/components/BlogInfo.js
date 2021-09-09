import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

const BlogInfo = () => {
    const blogs = useSelector(state => state.blogs)
    const match = useRouteMatch('/blogs/:id')

    const dispatch = useDispatch()

    const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

    if (!blog) {
        return (
            <h2>The blog does not exist</h2>
        )
    }

    return (
        <div>
            <h2>{blog.title} by {blog.author}</h2>
            <a href='{blog.url}'>{blog.url}</a>
            <h4>Added by: {blog.user.name}</h4>
            <h4>Likes: {blog.likes}</h4>
            <button onClick={() => dispatch(likeBlog(blog))}>Like</button>
        </div>
    )
}

export default BlogInfo