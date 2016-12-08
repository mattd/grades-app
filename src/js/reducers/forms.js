import {
    FORM_UPDATE,
    FORM_CLEAN
} from '../actions/types/forms';

const initialState = {
    term: {focused: 'name'}
};

const forms = (state = initialState, action) => {
    switch (action.type) {
        case FORM_UPDATE:
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    ...action.payload
                }
            };
        case FORM_CLEAN:
            return {
                ...state,
                [action.name]: {
                    ...initialState[action.name]
                }
            };
        default:
            return state;
    }
};

export default forms;