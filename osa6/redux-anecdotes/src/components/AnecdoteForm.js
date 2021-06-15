import { addAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const submitHandler = event => {
        event.preventDefault()
        dispatch(addAnecdote(event.target.newAnecdote.value))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submitHandler}>
                <div><input name='newAnecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm