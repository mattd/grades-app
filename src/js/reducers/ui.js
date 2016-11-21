import { TOGGLE_DRAWER } from '../actions/types/ui';

const ui = (state = { drawerOpen: false }, action) => {
    switch (action.type) {
        case TOGGLE_DRAWER:
            return {
                ...state,
                drawerOpen: !state.drawerOpen
            };
        default:
            return state;
    }
};

export default ui;