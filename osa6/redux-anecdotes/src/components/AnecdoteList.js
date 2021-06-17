import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector (state => state.filter)

    const sortedAnecdotes = anecdotes.sort((a, b) => {
        return b.votes - a.votes
    })
        
    const anecdotesToShow = filter === ''
        ? sortedAnecdotes
        : sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            {anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        votes: {anecdote.votes} &nbsp;
                        <button onClick={() => { dispatch(voteAnecdote(anecdote.id)) }}>vote</button>
                    </div>
                </div>
            )}
        </div>
        
    )

}

export default AnecdoteList