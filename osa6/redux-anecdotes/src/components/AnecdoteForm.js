import { addAnecdote } from "../reducers/anecdoteReducer"
import { showNotification } from '../reducers/notificationReducer'
import { useDispatch } from "react-redux"


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const submitHandler = event => {
        event.preventDefault()
        const newAnecdote = event.target.newAnecdote.value
        dispatch(addAnecdote(newAnecdote))
        dispatch(showNotification(`Added: ${newAnecdote}`, 5))
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

export default AnecdoteForm