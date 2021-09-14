import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { likeBlog, addComment } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const BlogInfo = () => {
    const blogs = useSelector(state => state.blogs)
    const match = useRouteMatch('/blogs/:id')

    const [input, setInput] = useState('')

    const dispatch = useDispatch()

    const blog = match ? blogs?.find(blog => blog?.id === match.params?.id) : null

    const handleSubmit = async () => {
        await dispatch(addComment(blog.id, input))
        setInput('')
    }

    if (!blog) {
        return (
            <h2>The blog does not exist</h2>
        )
    }

    return (
        <div className='blogdetails'>
            <h3>{blog.title} by {blog.author}</h3>
            <a href='{blog.url}'>{blog.url}</a>
            <h4>Added by: {blog.user.name}</h4>
            <br />
            <h4>Likes: {blog.likes}</h4>
            <button onClick={() => dispatch(likeBlog(blog))}>Like</button>
            <br /> <br />
            <h4>Comments</h4>
            <ul>
                {blog.comments.map(comment => {
                    return(
                        <li key={comment.id}>{comment.comment}</li>
                    )
                })}
            </ul>

            <Form className='commentForm' onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Post a comment</Form.Label>
                    <Form.Control type='text' value={input} onChange={({ target }) => setInput(target.value)} as='textarea' rows={10}/>
                    <br />
                    <Button type='submit' variant='info'>Submit</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default BlogInfo