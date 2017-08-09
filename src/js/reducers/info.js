import { INFO_UPDATED, INFO_CLOSED, INFO_CLEAR } from 'actions/types/info';

export const initialState = {
    message: undefined,
    open: false
};

const info = (state = initialState, action) => {
    switch (action.type) {
        case INFO_UPDATED:
            return {
                message: action.message,
                open: true
            };
        case INFO_CLOSED:
            return {
                ...state,
                open: false
            };
        case INFO_CLEAR:
            return initialState;
        default:
            return state;
    }
};

export default info;