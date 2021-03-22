import React, { useState } from 'react'


const App = () => {
    
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  
  const nextButtonHandler = () => {
    setSelected(Math.floor(Math.random() * Math.floor(anecdotes.length)))
  }

  const voteButtonHandler = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <h3>{anecdotes[selected]}</h3>
      <p>has {votes[selected]} votes</p>
      <button onClick={nextButtonHandler}>Next Anecdote</button>
      <button onClick={voteButtonHandler}>Vote</button>
      <h2>Anecdote with most votes</h2>
      <h3>{anecdotes[votes.indexOf(Math.max(...votes))]}</h3>


    </div>
  )
}

export default App