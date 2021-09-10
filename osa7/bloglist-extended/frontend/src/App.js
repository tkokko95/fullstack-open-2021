import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import Navbar from './components/Navbar'

import { fetchBlogs } from './reducers/blogsReducer'
import { getUsers } from './reducers/usersReducer'

const App = () => {

    const dispatch = useDispatch()
    const user = useSelector(store => store.login)

    const blogFormRef = React.createRef()

    useEffect(() => {
        dispatch(fetchBlogs())
        dispatch(getUsers())
    }, [])


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
            <Notification />
            <p>
                {user.name} logged in
            </p>

            <Router>
                <Navbar />
                <Switch>
                    <Route exact path='/users'>
                        <UserList />
                    </Route>
                    <Route exact path='/users/:id'>
                        <UserInfo />
                    </Route>
                    <Route exact path='/blogs/:id'>
                        <BlogInfo />
                    </Route>
                    <Route exact path='/blogs'>
                        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                            <NewBlog />
                        </Togglable>
                        <BlogList user={user} />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App