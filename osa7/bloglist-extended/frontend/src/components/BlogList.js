import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ user }) => {
    const blogs = useSelector(state => state.blogs)
    const byLikes = (b1, b2) => b2.likes - b1.likes

    return (
        <div>
            {blogs.sort(byLikes).map(blog => {
                <Blog
                    key={blog.id}
                    blog={blog}
                    own={user.username === blog.user.username}
                />
            })}
        </div>

    )
}

export default BlogList

