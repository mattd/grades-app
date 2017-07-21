import {
    AUTH_STATUS_UPDATED,
    AUTH_STATUS_READY
} from 'actions/types/auth';

export const initialState = {
    isAuthenticated: false,
    ready: false
};

const auth = (state = initialState, action) => {
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