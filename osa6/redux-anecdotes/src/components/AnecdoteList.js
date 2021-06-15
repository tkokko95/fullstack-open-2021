import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const sortedAnecdotes = anecdotes.sort((a,b) => {
        return b.votes - a.votes
    })

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => { dispatch(voteAnecdote(anecdote.id)) }}>vote</button>
                    </div>
                </div>
            )}
        </div>
        
    )

}

export default AnecdoteList