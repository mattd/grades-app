import {
    FORM_UPDATE_VALUES,
    FORM_UPDATE_DISPLAY,
    FORM_CLEAN
} from '../actions/types/forms';

const initialState = {
    term: {display: {focused: 'name'}, values: {}}
};

// TODO: Break this into sub-reducers.
const forms = (state = initialState, action) => {
    switch (action.type) {
        case FORM_UPDATE_VALUES:
            return {
                ...state,
                [action.name]: {
                    values: {
                        ...state[action.name].values,
                        ...action.payload
                    },
                    display: {
                        ...state[action.name].display
                    }
                }
            };
        case FORM_UPDATE_DISPLAY:
            return {
                ...state,
                [action.name]: {
                    display: {
                        ...state[action.name].display,
                        ...action.payload
                    },
                    values: {
                        ...state[action.name].values
                    }
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