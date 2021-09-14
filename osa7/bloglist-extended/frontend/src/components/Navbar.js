import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Button } from 'react-bootstrap'

const NavigationBar = () => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch(logout())
    }

    return (
        <div className='navbar'>
            <p><Link to='/blogs'>Blogs</Link> <Link to='/users'>Users</Link> <Button onClick={handleLogout} variant='danger'>Log out</Button></p>

        </div>
    )
}

export default NavigationBar