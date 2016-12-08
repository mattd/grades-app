import { FORM_UPDATE, FORM_CLEAN } from '../types/forms';

export const updateForm = (name, payload) => {
    return {
        type: FORM_UPDATE,
        name,
        payload
    };
};

export const cleanForm = (name) => {
    return {
        type: FORM_CLEAN,
        name
    };
};

export const resetForms = () => {
    return (dispatch, getState) => {
        const { forms } = getState();
        Object.keys(forms).forEach(form => {
            dispatch(cleanForm(form));
        });
    };
};