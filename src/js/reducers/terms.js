import { TERMS_UPDATED, TERMS_FLUSH } from '../actions/types/terms';

const initialState = {};

const terms = (state = initialState, action) => {
    switch (action.type) {
        case TERMS_UPDATED:
            return action.terms;
        case TERMS_FLUSH:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default terms;