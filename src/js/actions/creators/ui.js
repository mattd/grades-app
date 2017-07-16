import { UI_TOGGLE, UI_SET, UI_RESET } from '../types/ui';

export const toggleDrawer = () => {
    return {
        type: UI_TOGGLE,
        key: 'drawerOpen'
    };
};

export const setAddingTerm = (value) => {
    return {
        type: UI_SET,
        key: 'addingTerm',
        value
    };
};

export const resetUi = () => {
    return {
        type: UI_RESET
    };
};