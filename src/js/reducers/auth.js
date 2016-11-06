const command = (
    state = { type: undefined, success: undefined },
    action
) => {
    switch (action.type) {
        case 'AUTH_COMMAND':
            return {
                ...state,
                type: action.command,
                success: undefined
            };
        case 'AUTH_COMMAND_COMPLETED':
            return {
                ...state,
                success: action.success
            };
        default:
            return state;
    }
};

const auth = (
    state = { isAuthenticated: false, ready: true, command: {}},
    action
) => {
    switch (action.type) {
        case 'AUTH_STATUS_UPDATED':
            return {
                ...state,
                isAuthenticated: action.authenticated
            };
        case 'AUTH_STATUS_READY':
            return {
                ...state,
                ready: true
            };
        case 'AUTH_COMMAND':
        case 'AUTH_COMMAND_COMPLETED':
            return {
                ...state,
                command: command(state.command, action)
            };
        default:
            return state;
    }
};

export default auth;