import {
    AUTH_STATUS_UPDATED,
    AUTH_STATUS_READY
} from '../actions/types/auth';

const auth = (
    state = {
        isAuthenticated: false,
        ready: false
    },
    action
) => {
    switch (action.type) {
        case AUTH_STATUS_UPDATED:
            return {
                ...state,
                isAuthenticated: action.authenticated
            };
        case AUTH_STATUS_READY:
            return {
                ...state,
                ready: true
            };
        default:
            return state;
    }
};

export default auth;