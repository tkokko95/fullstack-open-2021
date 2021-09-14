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
import NavigationBar from './components/Navbar'

import { fetchBlogs } from './reducers/blogsReducer'
import { getUsers } from './reducers/usersReducer'

const App = () => {

    const dispatch = useDispatch()
    const user = useSelector(store => store.login)

    const blogFormRef = React.createRef()

    useEffect(() => {
        dispatch(fetchBlogs())
        dispatch(getUsers())
    }, [dispatch])


    if (!user) {
        return (
            <div className='container'>
                <Notification />
                <LoginForm />
            </div>
        )
    }

    return (
        <div className='container'>
            <Notification />
            <p>
                {user.name} logged in
            </p>

            <Router>
                <NavigationBar />
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
                        <BlogList user={user} />
                        <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
                            <NewBlog />
                        </Togglable>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App