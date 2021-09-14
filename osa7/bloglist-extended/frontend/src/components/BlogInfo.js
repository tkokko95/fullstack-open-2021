import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

const BlogInfo = () => {
    const blogs = useSelector(state => state.blogs)
    const match = useRouteMatch('/blogs/:id')

    const [input, setInput] = useState('')

    const dispatch = useDispatch()

    const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

    const handleSubmit = event => {
        event.preventDefault()
        console.log(input)
        setInput('')
    }

    if (!blog) {
        return (
            <h2>The blog does not exist</h2>
        )
    }

    return (
        <div className='commentPage'>
            <h2>{blog.title} by {blog.author}</h2>
            <a href='{blog.url}'>{blog.url}</a>
            <h4>Added by: {blog.user.name}</h4>
            <h4>Likes: {blog.likes}</h4>
            <button onClick={() => dispatch(likeBlog(blog))}>Like</button>
            <h4>Comments</h4>
            <ul>
                {blog.comments.map(comment => {
                    return(
                        <li key={comment.id}>{comment.comment}</li>
                    )
                })}
            </ul>

            <div className='commentForm'>
                <h5>Post a comment</h5>
                <form onSubmit={handleSubmit}>
                    <input type='text' value={input} onChange={({ target }) => setInput(target.value)} />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BlogInfo