import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserInfo = () => {
    const users = useSelector(state => state.users)
    const match = useRouteMatch('/users/:id')

    const user = match ? users.find(user => user.id === match.params.id) : null

    if (!user) {
        return (
            <h2>User does not exist</h2>
        )
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <p>Blogs:</p>
            <ul>
                {user.blogs.map(blog => {
                    return(
                        <li key={blog.id}>{blog.title}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default UserInfo