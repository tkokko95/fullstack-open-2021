import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        anecdoteService.getAll()
        .then(response => dispatch(initAnecdotes(response)))
    }, [])

    return (
        <div>
            <Notification />
            <h2>Anecdotes</h2>
            <br />
            <Filter />
            <br />
            <AnecdoteList />
            <br />
            <AnecdoteForm />
        </div>
    )
}

export default App