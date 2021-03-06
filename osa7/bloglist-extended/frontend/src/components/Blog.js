import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog, own }) => {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const label = visible ? 'hide' : 'view'

    return (
        <div style={blogStyle} className='blog'>
            <div>
                <Link to={`/blogs/${blog.id}`}>
                    <i>{blog.title}</i> by {blog.author}&nbsp;
                </Link>
                <button onClick={() => setVisible(!visible)}>{label}</button>
            </div>
            {visible && (
                <div>
                    <div>{blog.url}</div>
                    <div>likes {blog.likes} &nbsp;
                        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
                    </div>
                    <div>{blog.user.name}</div>
                    {own && <button onClick={() => dispatch(removeBlog(blog))}>remove</button>}
                </div>
            )}
        </div>
    )

}

Blog.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
    own: PropTypes.bool.isRequired
}

export default Blog