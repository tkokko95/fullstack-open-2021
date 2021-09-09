import usersService from '../services/users'

export const getUsers = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        dispatch({
            type: 'SET_USERS',
            data: users
        })
    }
}

const usersReducer = (state = [], action) => {
    switch (action.type) {
    case 'SET_USERS':
        return action.data
    default:
        return state
    }
}

export default usersReducer