import { UI_TOGGLE } from '../types/ui';

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