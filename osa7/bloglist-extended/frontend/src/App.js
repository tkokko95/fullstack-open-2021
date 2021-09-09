import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'

import { fetchBlogs } from './reducers/blogsReducer'
import { logout } from './reducers/loginReducer'

const App = () => {


    const dispatch = useDispatch()
    const user = useSelector(store => store.login)

    const blogFormRef = React.createRef()

    useEffect(() => {
        dispatch(fetchBlogs())
    }, [])

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch(logout())
    }


    if (!user) {
        return (
            <div>
                <Notification />
                <LoginForm />
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>

            <Notification />

            <p>
                {user.name} logged in <button onClick={handleLogout}>logout</button>
            </p>

            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <NewBlog />
            </Togglable>
            <BlogList user={user} />
        </div>
    )
}

export default App