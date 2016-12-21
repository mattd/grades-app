import { UI_TOGGLE, UI_RESET } from '../actions/types/ui';

const initialState = {
    drawerOpen: false,
    addingTerm: false
};

const ui = (state = initialState, action) => {
    switch (action.type) {
        case UI_TOGGLE:
            return {
                ...state,
                [action.value]: !state[action.value]
            };
        case UI_RESET:
            return initialState;
        default:
            return state;
    }
};

export default ui;