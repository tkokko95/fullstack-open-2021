import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const Navbar = () => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch(logout())
    }

    return (
        <div className='navbar'>
            <p><Link to='/blogs'>Blogs</Link> <Link to='/users'>Users</Link> <button onClick={handleLogout}>Log out</button></p>

        </div>
    )
}

export default Navbar