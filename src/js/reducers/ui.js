import { UI_TOGGLE, UI_SET, UI_RESET } from 'actions/types/ui';

export const initialState = {
    drawerOpen: false,
    addingTerm: false,
    termDetailMenuOpen: false
};

const ui = (state = initialState, action) => {
    switch (action.type) {
        case UI_TOGGLE:
            return {
                ...state,
                [action.key]: !state[action.key]
            };
        case UI_SET:
            return {
                ...state,
                [action.key]: action.value
            };
        case UI_RESET:
            return initialState;
        default:
            return state;
    }
};

export default ui;