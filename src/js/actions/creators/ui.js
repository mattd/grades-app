import Mousetrap from 'mousetrap';

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

export const startAddingTerm = () => {
    return (dispatch) => {
        dispatch(toggleAddingTerm());
        Mousetrap.bind('esc', () => {
            dispatch(toggleAddingTerm());
        });
    };
};

export const stopAddingTerm = () => {
    return (dispatch) => {
        dispatch(toggleAddingTerm());
        Mousetrap.unbind('esc');
    };
};
