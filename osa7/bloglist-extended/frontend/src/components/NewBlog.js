import React, { useState } from 'react'
import { addBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const NewBlog = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const handleNewBlog = (event) => {
        event.preventDefault()
        const blog = { title, author, url }
        dispatch(addBlog(blog))
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div className='blogform'>
            <h2>Create new</h2>
            <Form onSubmit={handleNewBlog}>
                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        id='author'
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                    <Form.Label>Title </Form.Label>
                    <Form.Control
                        id='title'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                    <Form.Label>Url</Form.Label>
                    <Form.Control
                        id='url'
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                    <Button id="create" type="submit" variant='success'>create</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default NewBlog