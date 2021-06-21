export const showNotification = (notification) => {
    return async dispatch => {
        dispatch ({
            type: 'SET_NOTIFICATION',
            data: notification
        })
        setTimeout(() => {
            dispatch ({
                type: 'REMOVE_NOTIFICATION'
            })
        }, notification.delay * 1000)
    }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
    case 'SET_NOTIFICATION':
        return action.data
    case 'REMOVE_NOTIFICATION':
        return ''
    default:
        return state
    }
}

export default notificationReducer