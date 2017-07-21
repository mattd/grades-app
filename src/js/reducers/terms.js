import { TERMS_UPDATED, TERMS_FLUSH } from 'actions/types/terms';

export const initialState = {};

const terms = (state = initialState, action) => {
    switch (action.type) {
        case TERMS_UPDATED:
            return action.terms || initialState;
        case TERMS_FLUSH:
            return initialState;
        default:
            return state;
    }
};

export default terms;