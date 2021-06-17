import { addAnecdote, asObject } from "../reducers/anecdoteReducer"
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import { useDispatch } from "react-redux"
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const submitHandler = event => {
        event.preventDefault()
        const newAnecdote = event.target.newAnecdote.value
        anecdoteService.create(asObject(newAnecdote))
        .then(response => {
            dispatch(addAnecdote(response.content))
            dispatch(showNotification(`Added: ${response.content}`))
            setTimeout(() => {
                dispatch(hideNotification())        
            }, 5000)
            event.target.newAnecdote.value = ''
        })
        

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