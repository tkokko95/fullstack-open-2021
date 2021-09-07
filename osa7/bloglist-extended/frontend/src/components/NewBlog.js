import React, { useState } from 'react'
import { addBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

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
        <div>
            <h2>create new</h2>
            <form onSubmit={handleNewBlog}>
                <div>
                    author
                    <input
                        id='author'
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    title
                    <input
                        id='title'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        id='url'
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button id="create" type="submit">create</button>
            </form>
        </div>
    )
}

export default NewBlog