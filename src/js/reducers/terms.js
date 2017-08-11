import { TERMS_UPDATED, TERMS_FLUSH } from 'actions/types/terms';

export const initialState = {
    meta: {updated: false},
    data: {}
};

const terms = (state = initialState, action) => {
    switch (action.type) {
        case TERMS_UPDATED:
            return {
                meta: {updated: true},
                data: action.terms || initialState.data
            };
         case TERMS_FLUSH:
            return initialState;
        default:
            return state;
    }
};

export default terms;