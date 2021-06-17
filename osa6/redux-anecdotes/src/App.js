import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
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