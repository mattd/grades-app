import { UI_TOGGLE, UI_RESET } from '../types/ui';

export const toggleDrawer = () => {
    return {
        type: UI_TOGGLE,
        value: 'drawerOpen'
    };
};

export const toggleAddingTerm = () => {
    return {
        type: UI_TOGGLE,
        value: 'addingTerm'
    };
};

export const resetUi = () => {
    return {
        type: UI_RESET
    };
};