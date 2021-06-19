import anecdoteService from '../services/anecdotes'


const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

export const voteAnecdote = id => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.like(id)
        dispatch({
            type: 'VOTE',
            data: updatedAnecdote
        })
    }
}

export const addAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.create(asObject(content))
        dispatch({
            type: 'ADD_ANECDOTE',
            data: newAnecdote
        })

    }

}

export const initAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        }
        )
    }

}

const anecdoteReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
    case 'VOTE': {
        const anecdoteToVote = state.find(obj => obj.id === action.data.id)
        const votedAnecdote = {
            ...anecdoteToVote,
            votes: anecdoteToVote.votes + 1
        }
        return state.map(anecdote =>
            anecdote.id === action.data.id ? votedAnecdote : anecdote
        )
    }
    case 'ADD_ANECDOTE':
        return [...state, action.data]
    case 'INIT_ANECDOTES':
        return action.data
    default:
        return state
    }

}

export default anecdoteReducer