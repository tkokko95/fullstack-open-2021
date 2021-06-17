import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

export const voteAnecdote = id => {
    return {
        type: 'VOTE',
        data: { id }
    }

}

export const addAnecdote = content => {
    const action = {
        type: 'ADD_ANECDOTE',
        data: asObject(content)
    }
    return action

}

export const initAnecdotes = (anecdotes) => {
    return {
        type: 'INIT_ANECDOTES',
        data: anecdotes
    }

}

const anecdoteReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'VOTE':
            const anecdoteToVote = state.find(obj => obj.id === action.data.id)
            const votedAnecdote = {
                ...anecdoteToVote,
                votes: anecdoteToVote.votes + 1
            }
            return state.map(anecdote => 
                anecdote.id === action.data.id ? votedAnecdote : anecdote
            )
        case 'ADD_ANECDOTE':
            return [...state, action.data]
        case 'INIT_ANECDOTES':
            return action.data
        default:
            return state
    }    

}

export default anecdoteReducer