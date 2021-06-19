import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import React from 'react'


const AnecdoteForm = ({ addAnecdote, showNotification }) => {

    const submitHandler = event => {
        event.preventDefault()
        const newAnecdote = event.target.newAnecdote.value
        addAnecdote(newAnecdote)
        showNotification(`Added: ${newAnecdote}`, 5)
        event.target.newAnecdote.value = ''

    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={submitHandler}>
                <div><input name='newAnecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = { addAnecdote, showNotification }
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm