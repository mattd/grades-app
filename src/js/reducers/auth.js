const auth = (state = { isAuthenticated: false }, action) => {
    switch (action.type) {
        case 'AUTH_STATUS_UPDATED':
            return {
                ...state,
                isAuthenticated: action.authenticated
            };
        default:
            return state;
    }
};

export default auth;