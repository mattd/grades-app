import { UI_TOGGLE, UI_SET, UI_RESET } from 'actions/types/ui';

export const toggleDrawer = () => {
    return {
        type: UI_TOGGLE,
        key: 'drawerOpen'
    };
};

export const toggleTermDetailMenu = () => {
    return {
        type: UI_TOGGLE,
        key: 'termDetailMenuOpen'
    };
};

export const setTermDetailMenuOpen = (value) => {
    return {
        type: UI_SET,
        key: 'termDetailMenuOpen',
        value
    };
}

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
