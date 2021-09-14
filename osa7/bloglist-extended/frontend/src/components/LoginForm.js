import React from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { showNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'


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
            <h2>Log in to application</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        id='username'
                        type='text'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        id='password'
                        value={password}
                        type='password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <Button id='login' type='submit' variant='primary'>Log in</Button>
                </Form.Group>

            </Form>
        </div>
    )

}

export default LoginForm

