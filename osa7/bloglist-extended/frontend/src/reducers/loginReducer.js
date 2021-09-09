import loginService from  '../services/login'
import storage from '../utils/storage'


const initialState = storage.loadUser() ? storage.loadUser() : null

export const login = (credentials) => {
    return async dispatch => {
        const user = await loginService.login(credentials)
        storage.saveUser(user)
        dispatch({
            type: 'LOGIN',
            data: user
        })
    }
}

export const logout = () => {
    return ({
        type:'LOGOUT'
    })
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'LOGIN':
        return action.data
    case 'LOGOUT':
        return null
    default:
        return state
    }
}

export default loginReducer