import React from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { showNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'


const LoginForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await dispatch(login({ username, password }))
            dispatch(showNotification({
                message: `${username}, welcome back!`,
                type: 'success',
                delay: 5
            }))
        } catch (e) {
            console.log(e)
            dispatch(showNotification({
                message: 'Login failed, please check username/password',
                type: 'error',
                delay: 5
            }))
        }
    }

    return (
        <div>
            <h2>login to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        id='username'
                        type='text'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        id='password'
                        value={password}
                        type='password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id='login'>login</button>
            </form>
        </div>
    )

}

export default LoginForm

