import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ user }) => {
    const blogs = useSelector(state => state.blogs)
    //const byLikes = (b1, b2) => b2.likes - b1.likes

    return (
        <div>
            {blogs.map(blog => {
                return(
                    <Blog
                        key={blog.id}
                        blog={blog}
                        own={blog.user.id === user.id}
                    />
                )
            })}
        </div>

    )
}

export default BlogList

