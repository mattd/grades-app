import {
    AUTH_STATUS_UPDATED,
    AUTH_STATUS_READY,
    AUTH_TOGGLE_TRANSITION,
    AUTH_SET_NEXT_PATH
} from '../actions/types/auth';

const auth = (
    state = {
        isAuthenticated: false,
        ready: false,
        transitioning: false,
        nextPath: null
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
        case AUTH_TOGGLE_TRANSITION:
            return {
                ...state,
                transitioning: !state.transitioning
            };
        case AUTH_SET_NEXT_PATH:
            return {
                ...state,
                nextPath: action.next
            };
        default:
            return state;
    }
};

export default auth;