import { UI_TOGGLE } from '../actions/types/ui';

import { makeObject } from '../utils/reducer';

const ui = (
    state = {
        drawerOpen: false,
        addingTerm: false
    },
    action
) => {
    switch (action.type) {
        case UI_TOGGLE:
            return {
                ...state,
                ...makeObject(action.value, !state[action.value])
            };
        default:
            return state;
    }
};

export default ui;