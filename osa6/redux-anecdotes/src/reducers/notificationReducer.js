export const showNotification = (notification => {
    return ({
        type: 'SET_NOTIFICATION',
        data: notification
    })
})

export const hideNotification = () => {
    return ({
        type: 'REMOVE_NOTIFICATION',
    })
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